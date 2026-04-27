import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery();

export const dailyReportCron = onSchedule('0 6 * * *', async (event) => {
  console.log('Generating daily executive report.');
  
  const datasetId = process.env.BIGQUERY_DATASET || 'sentinel_data';
  const query = `
    SELECT 
      count(*) as total_shipments,
      avg(risk_score) as avg_risk,
      sum(CASE WHEN risk_level = 'critical' THEN 1 ELSE 0 END) as critical_count
    FROM \`${datasetId}.risk_assessments\`
    WHERE timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
  `;

  try {
    const [rows] = await bigquery.query(query);
    const stats = rows[0];

    // Store summary for dashboard quick view
    await admin.database().ref('/reports/daily_summary').set({
      ...stats,
      generated_at: new Date().toISOString()
    });

    console.log('Daily report generated and stored in RTDB.');
  } catch (error) {
    console.error('Daily report generation failed:', error);
  }
});
