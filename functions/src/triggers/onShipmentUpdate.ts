import { onValueWritten } from 'firebase-functions/v2/database';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { Shipment, KPISnapshot } from '../types';

const RISK_ENGINE_URL = process.env.RISK_ENGINE_URL || 'http://localhost:8081';

export const processShipmentUpdate = onValueWritten('/shipments/{shipmentId}', async (event) => {
  const after = event.data.after.val() as Shipment;

  if (!after) return; // Deleted

  // Logic 1: Auto route if risk_score > 0.8
  if (after.risk_score > 0.8 && after.status !== 'rerouted' && after.status !== 'delivered') {
    console.log(`Triggering auto-reroute for ${after.id}`);
    try {
      await axios.post(`${RISK_ENGINE_URL}/reroute`, { shipment_id: after.id });
    } catch(e) {
      console.error(`Failed to reroute ${after.id}:`, e);
    }
  }

  // Logic 2: Update status to 'at_risk' if risk > 0.6
  if (after.risk_score > 0.6 && after.status === 'on_time') {
    await admin.database().ref(`/shipments/${after.id}`).update({ status: 'at_risk', updated_at: new Date().toISOString() });
  }

  // Logic 3: Update KPI snapshot
  await computeKPISnapshot();
});

async function computeKPISnapshot() {
  const snapshot = await admin.database().ref('/shipments').once('value');
  let total = 0, atRisk = 0, critical = 0, rerouted = 0, cumulativeDelay = 0;
  
  snapshot.forEach((child) => {
    const s = child.val() as Shipment;
    if (s.status !== 'delivered') {
      total++;
      if (s.status === 'at_risk') atRisk++;
      if (s.risk_score > 0.8) critical++;
      if (s.status === 'rerouted') rerouted++;
      cumulativeDelay += (s.delay_delta_hours || 0);
    }
  });

  const alertsSnap = await admin.database().ref('/incidents').once('value');
  let alertsCount = alertsSnap.numChildren();

  const kpiSnapshot: KPISnapshot = {
    total_active_shipments: total,
    at_risk_count: atRisk,
    critical_count: critical,
    auto_rerouted_today: rerouted,
    avg_delay_hours: total > 0 ? (cumulativeDelay / total) : 0,
    weather_alerts_active: alertsCount,
    cost_saved_inr: rerouted * 14500,
    inventory_value_inr: 0, // Would be calculated from /inventory
    timestamp: new Date().toISOString()
  };

  await admin.database().ref('/kpi/current').set(kpiSnapshot);
}
