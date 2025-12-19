import { sendPushNotifications } from "../config/pushsafer.js";
import { saveSensorData } from "../services/sensor.logs.service.js";
import { sendEmailAlert } from "../config/mailer.js";

const THRESHOLDS = {
  temperature: { max: 50, label: "Temperature High" },
  smoke: { max: 1, label: "Smoke Detected" },
  flame: { max: 10, label: "Flame Detected" },
};
const targetTopic = process.env.MQTT_TOPIC || "";
const deviceId = process.env.DEVICE_ID || ""; // Push Notification device

export const handleIncoming = async (topic, buffer) => {
  if (topic != targetTopic) {
    return;
  }
  try {
    const payload = JSON.parse(buffer.toString());
    const { userDeviceId, triggerType, ...sensorData } = payload;

    const alerts = [];

    for (const [key, val] of Object.entries(sensorData)) {
      const rule = THRESHOLDS[key];

      if (rule) {
        if (rule.max !== undefined && val >= rule.max) {
          alerts.push(`${rule.label}`);
        }
      }
    }

    if (alerts.length > 0) {
      const title = `Device ${deviceId}`;
      const msg = alerts.join("\n");

      await sendPushNotifications(msg, title, deviceId);
      await sendEmailAlert(userDeviceId, sensorData);
    }

    await saveSensorData(userDeviceId, triggerType, sensorData);
  } catch (e) {
    console.error("Error: ", e);
  }
};
