import * as admin from 'firebase-admin';

export async function seedInventory() {
  const warehousesSnap = await admin.database().ref('/warehouses').once('value');
  const warehouses: string[] = [];
  warehousesSnap.forEach(child => {
    warehouses.push(child.key!);
  });

  const skus = [
    { id: 'SKU-001', name: 'Premium Semiconductors', category: 'Electronics' },
    { id: 'SKU-002', name: 'Industrial Cooling Units', category: 'HVAC' },
    { id: 'SKU-003', name: 'Lithium Battery Cells', category: 'Energy' },
    { id: 'SKU-004', name: 'Precision Sensors', category: 'Electronics' },
    { id: 'SKU-005', name: 'Composite Airframe Parts', category: 'Aerospace' }
  ];

  const updates: any = {};
  for (const whId of warehouses) {
    for (const sku of skus) {
      const current = Math.floor(Math.random() * 500) + 100;
      const min = 150;
      const max = 800;
      
      let status = 'in_stock';
      if (current <= min) status = 'critical';
      else if (current <= min * 1.5) status = 'low';

      updates[`/inventory/${whId}/${sku.id}`] = {
        sku_id: sku.id,
        name: sku.name,
        category: sku.category,
        warehouse_id: whId,
        current_qty: current,
        min_qty: min,
        max_qty: max,
        reorder_qty: 200,
        unit: 'units',
        cost_per_unit: Math.floor(Math.random() * 5000) + 500,
        last_movement_date: new Date().toISOString(),
        status
      };
    }
  }

  await admin.database().ref().update(updates);
  console.log('Inventory seeded successfully.');
}
