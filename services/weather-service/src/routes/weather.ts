import { Router } from 'express';
import * as admin from 'firebase-admin';
import { fetchRouteWeather } from '../weatherFetcher';
import { computeWeatherExposureScore } from '../routeAnalyzer';
import { analyzeWeatherRisk } from '../geminiReasoner';
import { Shipment, Coordinates } from '../types';

const router = Router();

// POST /analyze-route
router.post('/analyze-route', async (req, res) => {
  try {
    const { shipment_id } = req.body;
    if (!shipment_id) return res.status(400).json({ error: 'shipment_id required' });

    const shipmentSnap = await admin.database().ref(`/shipments/${shipment_id}`).once('value');
    if (!shipmentSnap.exists()) return res.status(404).json({ error: 'Shipment not found' });

    const shipment: Shipment = shipmentSnap.val();
    const waypoints: Coordinates[] = shipment.route_waypoints || [];

    const waypointWeathers = await fetchRouteWeather(waypoints);
    const analysis = computeWeatherExposureScore(shipment_id, waypointWeathers);
    const riskAssessment = await analyzeWeatherRisk(shipment, analysis);

    res.json({ analysis, riskAssessment });
  } catch (error) {
    console.error('Weather analysis error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /weather/:lat/:lng
router.get('/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const waypoints = [{ lat: parseFloat(lat), lng: parseFloat(lng) }];
    const weather = await fetchRouteWeather(waypoints);
    res.json(weather[0]);
  } catch (error) {
    console.error('Weather fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
