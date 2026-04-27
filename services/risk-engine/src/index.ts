import express from 'express';
import * as admin from 'firebase-admin';
import assessRoutes from './routes/assess';
import rerouteRoutes from './routes/reroute';
import cascadeRoutes from './routes/cascade';

admin.initializeApp();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Routes
app.use('/assess', assessRoutes);
app.use('/reroute', rerouteRoutes);
app.use('/cascade', cascadeRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'risk-engine',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
    console.log(`Risk Engine listening on port ${PORT}`);
});
