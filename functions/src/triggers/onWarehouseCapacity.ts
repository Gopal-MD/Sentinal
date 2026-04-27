import { onValueWritten } from 'firebase-functions/v2/database';
import { sendRiskNotification } from '../fcmNotifier';

export const onWarehouseCapacity = onValueWritten('/warehouses/{whId}', async (event) => {
  const after = event.data.after.val();
  if (!after) return;

  const utilization = after.current_usage / after.total_capacity;

  if (utilization > 0.9) {
    const message = `Capacity Alert: ${after.name} is at ${(utilization * 100).toFixed(1)}% utilization.`;
    console.warn(message);
    await sendRiskNotification(after.id, 'Warehouse', message);
  }
});
