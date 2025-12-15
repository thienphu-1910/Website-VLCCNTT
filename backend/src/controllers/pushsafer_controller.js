import { sendPushNotifications } from "../config/pushsafer";
import { saveSensorData } from "./firebase_controller";

const THRESHOLDS = {
    temperature: {max: 50, label: "Temperature High"},
    smoke: {max: 1, label: "Smoke Detected"},
    flame: {max: 10, label: "Flame Detected"}
}
const target_topic = process.env.MQTT_TOPIC || '';
const device_id = process.env.DEVICE_ID || '';


export const handleIncoming = async (topic, buffer) => {
    if (topic != target_topic) {
        return;
    }

    try {
        const payload = JSON.parse(buffer.toString());
        const { deviceId, ...sensor_data } = payload;

        const alerts = []

        for (const [key, val] of Object.entries(sensor_data)) {
            const rule = THRESHOLDS[key];

            if (rule) {
                if (rule.max !== undefined && val > rule.max) {
                    alerts.push(`${rule.label}`);
                }
            }
        }

        if (alerts.length() > 0) {
            const title = `Device ${device_id}`;
            const msg = alerts.join('\n');

            await sendPushNotifications(msg, title, device_id);
        } else {
            // Write to firebase database
            await saveSensorData(deviceId, sensor_data);
        }
    } catch (e) {
        console.error("Error: ", e);        
    }
}