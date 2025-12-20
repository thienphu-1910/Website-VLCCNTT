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
    // const id = setInterval(async () => {
    //   const data = await loadSensorData("1");
    //   const mockData = {
    //     deviceId: data.deviceId,
    //     triggerType: data["0"].triggerType,
    //     timestamp: new Date(data["0"].timestamp),
    //     sensorsData: data["0"].sensorsData
    //   }
    //   onData(mockData);
    //   console.log(mockData)
    // }, 10000);

    return () => {
      client.removeListener('message', handleMessage);
      // clearInterval(id);
    }
  },
};