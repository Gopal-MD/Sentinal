import { onValueCreated } from 'firebase-functions/v2/database';
import axios from 'axios';

const RISK_ENGINE_URL = process.env.RISK_ENGINE_URL || 'http://localhost:8081';

export const onShipmentCreate = onValueCreated('/shipments/{shipmentId}', async (event) => {
  const shipmentId = event.params.shipmentId;
  console.log(`New shipment detected: ${shipmentId}. Triggering initial risk assessment.`);
  
  try {
    await axios.post(`${RISK_ENGINE_URL}/assess`, { shipment_id: shipmentId });
  } catch (e) {
    console.error(`Failed initial assessment for ${shipmentId}:`, e);
  }
});
