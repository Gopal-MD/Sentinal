import { Router } from 'express';
import * as admin from 'firebase-admin';
import { executeRerouting } from '../rerouteAgent';
import { analyzeCascadeImpact } from '../cascadeAnalyzer';
import { Shipment, RiskAssessment } from '../types';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { shipment_id } = req.body;
    if (!shipment_id) return res.status(400).json({ error: 'shipment_id required' });

    const snapshot = await admin.database().ref(`/shipments/${shipment_id}`).once('value');
    if (!snapshot.exists()) return res.status(404).json({ error: 'Shipment not found' });
    const shipment: Shipment = snapshot.val();

    const riskSnap = await admin.database().ref(`/risk_assessments/${shipment_id}/combined`).once('value');
    if (!riskSnap.exists()) return res.status(404).json({ error: 'No risk assessment found' });
    const riskAssessment: RiskAssessment = riskSnap.val();

    const decision = await executeRerouting(shipment, riskAssessment);
    const cascade = await analyzeCascadeImpact(shipment);

    res.json({ message: 'Rerouting executed', decision, cascade });
  } catch (error) {
    console.error('Rerouting error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
