import { client } from "../config/mqtt.js";

const target_topic = process.env.MQTT_TOPIC || '';

export const MqttService = {
  subscribeToTopic: (onData) => {
    const handleMessage = (topic, message) => {
      if (!topic && topic !== target_topic) return;
      try {
        const raw_data = JSON.parse(message.toString());
        onData(raw_data);
      } catch (err) {
        console.log("Subscribe to topic error: ", err.message);
      }
    };

    const id = setInterval(() => {
      const mockData = {
        deviceID: 1,
        triggerType: Math.floor(Math.random() * 2) ,
        flame_percentage: Math.floor(Math.random() * 100), 
        smoke: Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 50),
      };
      //console.log("Send Data");
      onData(mockData);
    }, 1000);

    return () => {
      client.removeListener('message', handleMessage);
      clearInterval(id);
    }
  },
};