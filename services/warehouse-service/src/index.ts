import express from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { listWarehouses, getWarehouseDetails } from './warehouseManager';

dotenv.config();

admin.initializeApp();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8083;

app.get('/warehouses', async (req, res) => {
  try {
    const warehouses = await listWarehouses();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouses' });
  }
});

app.get('/warehouse/:id', async (req, res) => {
  try {
    const details = await getWarehouseDetails(req.params.id);
    res.json(details);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'warehouse-service' });
});

app.listen(PORT, () => {
  console.log(`Warehouse service listening on port ${PORT}`);
});
