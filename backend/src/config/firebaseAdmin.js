import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS) : undefined;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };