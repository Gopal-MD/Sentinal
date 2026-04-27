import express from 'express';
import * as admin from 'firebase-admin';
import weatherRoutes from './routes/weather';
import alertRoutes from './routes/alerts';
import healthRoutes from './routes/health';
import { startAlertPolling } from './alertInterceptor';

admin.initializeApp();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Routes
app.use('/weather', weatherRoutes);
app.use('/alerts', alertRoutes);
app.use('/health', healthRoutes);

// Compatibility alias for legacy calls
app.use('/', weatherRoutes);

app.listen(PORT, () => {
    console.log(`Weather service listening on port ${PORT}`);
    startAlertPolling();
});
