import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { Shipment, RiskAssessment } from '../types';
import { BigQuery } from '@google-cloud/bigquery';

const RISK_ENGINE_URL = process.env.RISK_ENGINE_URL || 'http://localhost:8081';
const bigquery = new BigQuery();

export const scheduledRiskScan = onSchedule('every 5 minutes', async (event) => {
  const snapshot = await admin.database().ref('/shipments').once('value');
  const shipments: Shipment[] = [];
  snapshot.forEach((child) => {
    const s = child.val() as Shipment;
    if (s.status !== 'delivered') shipments.push(s);
  });

  console.log(`Starting scheduled scan for ${shipments.length} active shipments.`);

  for (const shipment of shipments) {
    try {
      const assessRes = await axios.post(`${RISK_ENGINE_URL}/assess`, { shipment_id: shipment.id });
      const assessment: RiskAssessment = assessRes.data.riskAssessment;

      if (!assessment) continue;

      // Update basic fields on Shipment node
      await admin.database().ref(`/shipments/${shipment.id}`).update({
        risk_score: assessment.risk_score,
        weather_exposure_score: assessment.weather_risk_score,
        updated_at: new Date().toISOString()
      });

      // Log to BigQuery for historical analysis
      const datasetId = process.env.BIGQUERY_DATASET || 'sentinel_data';
      try {
        await bigquery.dataset(datasetId).table('risk_assessments').insert([assessment]);
      } catch(bqErr) {
        console.error('BQ Insert failed:', bqErr);
      }
      
    } catch (e) {
      console.error(`Failed scheduled risk scan for ${shipment.id}`, e);
    }
  }
});
