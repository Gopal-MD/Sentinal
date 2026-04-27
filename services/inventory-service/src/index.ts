import express from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { getInventory, updateStock } from './inventoryManager';

dotenv.config();

admin.initializeApp();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8082;

app.get('/inventory', async (req, res) => {
  try {
    const items = await getInventory();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

app.post('/adjust-stock', async (req, res) => {
  try {
    const { sku_id, warehouse_id, adjustment, reason } = req.body;
    if (!sku_id || !warehouse_id || adjustment === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const updatedItem = await updateStock(sku_id, warehouse_id, adjustment, reason || 'Manual adjustment');
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'inventory-service' });
});

app.listen(PORT, () => {
  console.log(`Inventory service listening on port ${PORT}`);
});
