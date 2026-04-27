import * as admin from 'firebase-admin';
import { Warehouse } from './types';

export async function listWarehouses() {
  const snapshot = await admin.database().ref('/warehouses').once('value');
  const warehouses: Warehouse[] = [];
  snapshot.forEach(child => {
    warehouses.push(child.val());
  });
  return warehouses;
}

export async function getWarehouseDetails(id: string) {
  const snapshot = await admin.database().ref(`/warehouses/${id}`).once('value');
  if (!snapshot.exists()) throw new Error('Warehouse not found');
  return snapshot.val() as Warehouse;
}

export async function updateCapacity(id: string, currentUsage: number) {
  const ref = admin.database().ref(`/warehouses/${id}`);
  await ref.update({
    current_usage: currentUsage,
    updated_at: new Date().toISOString()
  });
}
