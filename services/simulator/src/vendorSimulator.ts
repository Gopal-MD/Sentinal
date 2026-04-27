import * as admin from 'firebase-admin';

export async function seedVendors() {
  const vendors = [
    { id: 'V-001', name: 'Bharat Logistics', type: 'carrier', city: 'Mumbai', rating: 4.8, on_time: 96 },
    { id: 'V-002', name: 'Swift Express 3PL', type: '3pl', city: 'Delhi', rating: 4.2, on_time: 89 },
    { id: 'V-003', name: 'Precision Parts Corp', type: 'supplier', city: 'Bangalore', rating: 4.5, on_time: 92 },
    { id: 'V-004', name: 'Indo-Global Freight', type: 'carrier', city: 'Chennai', rating: 3.9, on_time: 81 },
    { id: 'V-005', name: 'Solaris Systems', type: 'supplier', city: 'Hyderabad', rating: 4.7, on_time: 94 }
  ];

  const updates: any = {};
  vendors.forEach(v => {
    updates[`/vendors/${v.id}`] = {
      id: v.id,
      name: v.name,
      type: v.type,
      city: v.city,
      contact_email: `ops@${v.name.toLowerCase().replace(/ /g, '')}.com`,
      contact_phone: '+91-9876543210',
      on_time_pct: v.on_time,
      quality_score: Math.floor(Math.random() * 20) + 80,
      cost_index: Math.floor(Math.random() * 50) + 50,
      rating: v.rating,
      is_active: true,
      created_at: new Date().toISOString()
    };
  });

  await admin.database().ref().update(updates);
  console.log('Vendors seeded successfully.');
}

export async function seedWarehouses() {
    const hubs = [
        { id: 'WH-MUM-01', name: 'Mumbai Central Hub', city: 'Mumbai', state: 'MH', lat: 19.0760, lng: 72.8777, capacity: 5000 },
        { id: 'WH-DEL-01', name: 'NCR Logistics Park', city: 'Delhi', state: 'DL', lat: 28.6139, lng: 77.2090, capacity: 8000 },
        { id: 'WH-BLR-01', name: 'Bangalore Tech-Logistics', city: 'Bangalore', state: 'KA', lat: 12.9716, lng: 77.5946, capacity: 4000 },
        { id: 'WH-MAA-01', name: 'Chennai Port Depot', city: 'Chennai', state: 'TN', lat: 13.0827, lng: 80.2707, capacity: 6000 },
        { id: 'WH-HYD-01', name: 'Hyderabad Distribution', city: 'Hyderabad', state: 'TG', lat: 17.3850, lng: 78.4867, capacity: 4500 }
    ];

    const updates: any = {};
    hubs.forEach(h => {
        updates[`/warehouses/${h.id}`] = {
            id: h.id,
            name: h.name,
            city: h.city,
            state: h.state,
            address: `Gate 4, Industrial Area, ${h.city}`,
            coords: { lat: h.lat, lng: h.lng },
            total_capacity: h.capacity,
            current_usage: Math.floor(Math.random() * h.capacity * 0.8),
            contact_name: 'Operational Manager',
            contact_phone: '+91-1234567890',
            contact_email: `wh-${h.id.toLowerCase()}@sentinel.com`,
            staff_count: Math.floor(Math.random() * 50) + 20,
            receiving_queue_count: Math.floor(Math.random() * 10),
            shipping_queue_count: Math.floor(Math.random() * 15),
            created_at: new Date().toISOString()
        };
    });

    await admin.database().ref().update(updates);
    console.log('Warehouses seeded successfully.');
}
