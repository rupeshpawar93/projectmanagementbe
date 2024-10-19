// import admin from 'firebase-admin';
// // Replace the path with the path to your service account key JSON file
// const serviceAccount = require('../../teertha-e137a-firebase-adminsdk-up8pb-2eb452cb4c.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
  
//   // Function to send a push notification
// export async function sendPushNotification(token, title, body) {
//     const message = {
//       notification: {
//         title: title,
//         body: body,
//       },
//       token: token,
//     };
  
//     try {
//       const response = await admin.messaging().send(message);
//       console.log('Successfully sent message:', response);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
// }
