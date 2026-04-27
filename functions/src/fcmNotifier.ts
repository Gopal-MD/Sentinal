import * as admin from 'firebase-admin';

export async function sendRiskNotification(shipmentId: string, riskLevel: string, message: string) {
  try {
    const usersSnap = await admin.firestore().collection('users').get();
    
    const tokens: string[] = [];
    usersSnap.forEach(doc => {
      const data = doc.data();
      if (data.fcmToken) {
        tokens.push(data.fcmToken);
      }
    });

    if (tokens.length === 0) {
      console.log('No FCM tokens found for push notifications.');
      return;
    }

    const payload = {
      notification: {
        title: `SENTINEL Alert: ${shipmentId} (${riskLevel})`,
        body: message,
      },
      data: {
        shipment_id: shipmentId,
        risk_level: riskLevel,
        timestamp: new Date().toISOString()
      },
    };

    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      ...payload
    });

    console.log(`${response.successCount} messages sent successfully, ${response.failureCount} failed.`);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}
