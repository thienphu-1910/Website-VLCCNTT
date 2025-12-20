import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS ? process.env.GOOGLE_APPLICATION_CREDENTIALS : undefined;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
});


const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };