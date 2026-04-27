import { Router } from 'express';
import * as admin from 'firebase-admin';

const router = Router();

// GET /alerts
router.get('/', async (req, res) => {
  try {
    const alertsSnap = await admin.database().ref('/incidents').once('value');
    const alerts: any[] = [];
    alertsSnap.forEach(child => {
      alerts.push(child.val());
    });
    res.json(alerts);
  } catch (error) {
    console.error('Alerts fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
