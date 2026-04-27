import * as admin from 'firebase-admin';
import { Vendor } from './types';

export async function listVendors() {
  const snapshot = await admin.database().ref('/vendors').once('value');
  const vendors: Vendor[] = [];
  snapshot.forEach(child => {
    vendors.push(child.val());
  });
  return vendors;
}

export async function getVendorScorecard(id: string) {
  const snapshot = await admin.database().ref(`/vendors/${id}`).once('value');
  if (!snapshot.exists()) throw new Error('Vendor not found');
  
  const vendor: Vendor = snapshot.val();
  
  // In a real app, we would calculate this from historical order data
  return {
    vendor_id: vendor.id,
    name: vendor.name,
    on_time_delivery_rate: vendor.on_time_pct,
    quality_score: vendor.quality_score,
    cost_index: vendor.cost_index,
    rating: vendor.rating,
    recent_incidents: 0
  };
}
