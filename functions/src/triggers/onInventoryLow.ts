import { onValueWritten } from 'firebase-functions/v2/database';
import * as admin from 'firebase-admin';
import { sendRiskNotification } from '../fcmNotifier';

export const onInventoryLow = onValueWritten('/inventory/{warehouseId}/{skuId}', async (event) => {
  const after = event.data.after.val();
  if (!after) return;

  if (after.status === 'critical' || after.status === 'low') {
    const message = `Stock Alert: ${after.name} is ${after.status} in ${after.warehouse_id}. Current Qty: ${after.current_qty}`;
    console.log(message);
    
    // Notify relevant managers
    await sendRiskNotification(after.sku_id, 'Inventory', message);
    
    // Log to audit trail
    await admin.database().ref('/audit_logs').push({
        action: 'INVENTORY_ALERT',
        entity_type: 'inventory',
        entity_id: after.sku_id,
        new_value: after.status,
        timestamp: new Date().toISOString()
    });
  }
});
