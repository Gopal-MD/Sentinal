import { Router } from 'express';
import * as admin from 'firebase-admin';
import { analyzeCascadeImpact } from '../cascadeAnalyzer';
import { Shipment } from '../types';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const shipment_id = req.params.id;
    const snapshot = await admin.database().ref(`/shipments/${shipment_id}`).once('value');
    if (!snapshot.exists()) return res.status(404).json({ error: 'Shipment not found' });
    const shipment: Shipment = snapshot.val();

    const cascade = await analyzeCascadeImpact(shipment);
    res.json(cascade);
  } catch (error) {
    console.error('Cascade analysis fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
