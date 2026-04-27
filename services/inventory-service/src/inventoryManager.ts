import * as admin from 'firebase-admin';
import { InventoryItem } from './types';

export async function getInventory() {
  const snapshot = await admin.database().ref('/inventory').once('value');
  const items: InventoryItem[] = [];
  snapshot.forEach(warehouse => {
    warehouse.forEach(sku => {
      items.push(sku.val());
    });
  });
  return items;
}

export async function updateStock(sku_id: string, warehouse_id: string, adjustment: number, reason: string) {
  const ref = admin.database().ref(`/inventory/${warehouse_id}/${sku_id}`);
  const snapshot = await ref.once('value');
  if (!snapshot.exists()) throw new Error('SKU not found in warehouse');

  const item: InventoryItem = snapshot.val();
  const newQty = item.current_qty + adjustment;
  
  let status: InventoryItem['status'] = 'in_stock';
  if (newQty <= item.min_qty) status = 'critical';
  else if (newQty <= item.min_qty * 1.5) status = 'low';
  else if (newQty >= item.max_qty) status = 'overstock';

  const updates = {
    current_qty: newQty,
    status,
    last_movement_date: new Date().toISOString()
  };

  await ref.update(updates);
  
  // Log movement
  await admin.database().ref('/inventory_movements').push({
    sku_id,
    warehouse_id,
    adjustment,
    reason,
    timestamp: new Date().toISOString()
  });

  return { ...item, ...updates };
}
