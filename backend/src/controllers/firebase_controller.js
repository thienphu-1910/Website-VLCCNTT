import { db } from "../config/firebaseAdmin.js";

export const saveSensorData = async (deviceId, triggerManual, sensorData) => {
    try {
        const timestamp = new Date();

        const docData = {
            deviceId: deviceId,
            trigger: triggerManual,
            ...sensorData,
            timestamp: timestamp,
        };

        await db.collection('sensor-logs').add(docData);
        console.log("Saved to firestore");

        return true;
    } catch (e) {
        console.error("Error ", e);
        return false;
    }
}