import { Router } from 'express';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { computeCombinedRisk, determineRiskLevel } from '../riskScorer';
import { fullRiskAssessment } from '../geminiAgent';
import { Shipment, RiskAssessment } from '../types';

const router = Router();
const WEATHER_SERVICE_URL = process.env.WEATHER_SERVICE_URL || 'http://weather-service:8080';

router.post('/', async (req, res) => {
  try {
    const { shipment_id } = req.body;
    if (!shipment_id) return res.status(400).json({ error: 'shipment_id required' });

    const snapshot = await admin.database().ref(`/shipments/${shipment_id}`).once('value');
    if (!snapshot.exists()) return res.status(404).json({ error: 'Shipment not found' });
    const shipment: Shipment = snapshot.val();

    // Call weather service
    const weatherRes = await axios.post(`${WEATHER_SERVICE_URL}/analyze-route`, { shipment_id });
    const weatherAnalysis = weatherRes.data?.analysis;
    const weatherRisk = weatherAnalysis?.overall_exposure_score || 0;

    // Stub out traffic and carrier stats (in production these come from real APIs)
    const trafficData = { actual_duration: 120, typical_duration: 100, delay_minutes: 20 };
    const carrierStats = { delay_rate: 0.15, avg_delay_rate: 15 };
    const hoursRemaining = 5.5;

    const combinedScore = computeCombinedRisk(shipment, weatherRisk, trafficData, carrierStats);
    const riskLevel = determineRiskLevel(combinedScore);

    const assessment = await fullRiskAssessment(
      shipment, combinedScore, weatherAnalysis, trafficData, carrierStats, hoursRemaining
    );

    const assessmentId = `AR_${Date.now()}`;
    const riskDoc: RiskAssessment = {
      assessment_id: assessmentId,
      shipment_id: shipment.id,
      timestamp: new Date().toISOString(),
      risk_score: combinedScore,
      weather_risk_score: weatherRisk,
      traffic_risk_score: trafficData.actual_duration / trafficData.typical_duration - 1 || 0,
      combined_risk_score: combinedScore,
      predicted_delay_hours: assessment?.predicted_delay_hours || 0,
      confidence: assessment?.confidence || 0.8,
      risk_level: assessment?.overall_risk_level || riskLevel,
      reasoning: assessment?.reasoning || 'Risk assessment completed with automated scoring.',
      recommended_action: assessment?.recommended_action || 'proceed',
      auto_actioned: false
    };

    await admin.database().ref(`/risk_assessments/${shipment.id}/combined`).set(riskDoc);

    res.json({ riskAssessment: riskDoc });
  } catch (error) {
    console.error('Risk assessment error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
