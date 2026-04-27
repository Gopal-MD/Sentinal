import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { createSimulatedShipments } from './shipmentFactory';
import { startDisruptionTimeline } from './disruptionInjector';
import { seedVendors, seedWarehouses } from './vendorSimulator';
import { seedInventory } from './inventorySimulator';

dotenv.config();

const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

if (!dbUrl) {
  console.error("FATAL ERROR: NEXT_PUBLIC_FIREBASE_DATABASE_URL is not set.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: dbUrl
});

const MS_INTERVAL = 30000;

async function start() {
  console.log('--- SENTINEL ENHANCED SIMULATOR STARTING ---');

  // Clear previous runs
  await admin.database().ref('/shipments').remove();
  await admin.database().ref('/disruptions').remove();
  await admin.database().ref('/risk_assessments').remove();
  await admin.database().ref('/incidents').remove();
  await admin.database().ref('/cascade_alerts').remove();
  await admin.database().ref('/inventory').remove();
  await admin.database().ref('/warehouses').remove();
  await admin.database().ref('/vendors').remove();

  // Phase 1: Initialize Baseline Data
  await seedVendors();
  await seedWarehouses();
  await seedInventory();

  // Phase 2: Generate Shipments
  await createSimulatedShipments();

  // Phase 3: Start injecting cascading disruptions
  startDisruptionTimeline();

  // Phase 4: Loop simulation state
  setInterval(async () => {
    await updateShipmentPositions();
  }, MS_INTERVAL);
}

async function updateShipmentPositions() {
  const snapshot = await admin.database().ref('/shipments').once('value');
  
  const updates: Record<string, any> = {};

  snapshot.forEach(child => {
    const s = child.val();
    if (s.status === 'delivered') return;

    // Move shipment artificially along route
    const target = s.route_waypoints[s.route_waypoints.length - 1];
    
    const latDiff = target.lat - s.current_location.lat;
    const lngDiff = target.lng - s.current_location.lng;

    const newLat = s.current_location.lat + (latDiff * 0.05);
    const newLng = s.current_location.lng + (lngDiff * 0.05);

    // If near target, mark delivered
    if (Math.abs(newLat - target.lat) < 0.1 && Math.abs(newLng - target.lng) < 0.1) {
      updates[`/shipments/${s.id}/status`] = 'delivered';
      updates[`/shipments/${s.id}/updated_at`] = new Date().toISOString();
      return;
    }

    updates[`/shipments/${s.id}/current_location/lat`] = newLat;
    updates[`/shipments/${s.id}/current_location/lng`] = newLng;
    updates[`/shipments/${s.id}/updated_at`] = new Date().toISOString();
  });

  if (Object.keys(updates).length > 0) {
    await admin.database().ref().update(updates);
  }
}

start().catch(console.error);
