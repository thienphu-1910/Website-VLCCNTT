import { db } from "../config/firebaseAdmin";

export const saveSensorData = async (deviceId, sensorData) => {
    try {
        const timestamp = new Date();

        const docData = {
            deviceId: deviceId,
            ...sensorData,
            timestamp: timestamp,
        };

        await db.collection('sensor-logs').add(docData);

        return true;
    } catch (e) {
        console.error("Error ", e);
        return false;
    }
}