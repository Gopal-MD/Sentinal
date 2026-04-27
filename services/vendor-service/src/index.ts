import express from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { listVendors, getVendorScorecard } from './vendorManager';

dotenv.config();

admin.initializeApp();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8084;

app.get('/vendors', async (req, res) => {
  try {
    const vendors = await listVendors();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

app.get('/vendor/:id/scorecard', async (req, res) => {
  try {
    const scorecard = await getVendorScorecard(req.params.id);
    res.json(scorecard);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'vendor-service' });
});

app.listen(PORT, () => {
  console.log(`Vendor service listening on port ${PORT}`);
});
