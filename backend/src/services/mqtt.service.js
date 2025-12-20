import { raw } from "express";
import { client } from "../config/mqtt.js";
import { loadSensorData } from "./sensor.logs.service.js";

const target_topic = process.env.MQTT_TOPIC || '';

export const MqttService = {
  subscribeToTopic: (onData) => {
    const handleMessage = (topic, message) => {
      if (!topic || topic !== target_topic) return;
      try {
        const rawData = JSON.parse(message.toString());
        onData(rawData);
      } catch (err) {
        console.log("Subscribe to topic error: ", err.message);
      }
    };

    client.on('message', handleMessage);
    // const id = setInterval(async () => {
    //   const data = await loadSensorData("1");
    //   const mockData = {
    //     deviceId: data.deviceId,
    //     triggerType: data["0"].trigger,
    //     timestamp: new Date(data["0"].timestamp),
    //     sensorsData: data["0"].sensorsData
    //   }
    //   onData(mockData);
    //   console.log(mockData)
    // }, 1000000);

    return () => {
      client.removeListener('message', handleMessage);
      //clearInterval(id);
    }
  },
};