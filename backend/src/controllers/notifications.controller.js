import { sendPushNotifications } from "../config/pushsafer.js";
import { saveSensorData } from "../services/sensor.logs.service.js";
import { sendEmailAlert } from "../config/mailer.js";

const FLAME_THRESHOLD = Number(process.env.FLAME_THRESHOLD) || 10;
const SMOKE_THRESHOLD = Number(process.env.SMOKE_THRESHOLD) || 1;
const TEMPERATURE_THRESHOLD = Number(process.env.TEMPERATURE_THRESHOLD) || 50;

const THRESHOLDS = {
  temperature: { max: TEMPERATURE_THRESHOLD, label: "Temperature High" },
  smoke: { max: SMOKE_THRESHOLD, label: "Smoke Detected" },
  flame: { max: FLAME_THRESHOLD, label: "Flame Detected" },
};
const targetTopic = process.env.MQTT_TOPIC || "";
const deviceId = process.env.DEVICE_ID || ""; // Push Notification device

export const handleIncoming = async (topic, buffer) => {
  if (topic !== targetTopic) {
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
