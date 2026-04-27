import * as admin from 'firebase-admin';

admin.initializeApp();

// Triggers
export * from './triggers/onShipmentCreate';
export * from './triggers/onShipmentUpdate';
export * from './triggers/onInventoryLow';
export * from './triggers/onWarehouseCapacity';

// Scheduled Jobs
export * from './scheduled/riskScanCron';
export * from './scheduled/dailyReportCron';

// Core Utilities
export { sendRiskNotification } from './fcmNotifier';
