import { raw } from "express";
import { client } from "../config/mqtt.js";
import { loadSensorData } from "./sensor.logs.service.js";
import { Timestamp } from "firebase-admin/firestore";

const target_topic = process.env.MQTT_TOPIC || '';

export const MqttService = {
    subscribeToTopic: (onData) => {
    const handleMessage = (topic, message) => {
      if (!topic || topic !== target_topic) return;
      try {
        const rawData = JSON.parse(message.toString());
        const data = {
          deviceId: rawData.deviceId,
          triggerType: rawData.deviceId,
          timestamp: new Date().toISOString(),
          sensorsData: {
            temperature: rawData.temperature,
            smoke: rawData.smoke,
            flame: rawData.flame,
          },
        };
        onData(data);
      } catch (err) {
        console.log("Subscribe to topic error: ", err.message);
      }
    };

    client.on('message', handleMessage);

    return () => {
      client.removeListener('message', handleMessage);
    }
  },
};