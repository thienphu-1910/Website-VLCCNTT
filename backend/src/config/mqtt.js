import mqtt from "mqtt";

const brokerUrl = process.env.MQTT_BROKER_URI || '';
const clientId = 'my_client_' + Math.random().toString(16).substring(2, 8);
const username = process.env.MQTT_USERNAME || '';
const password = process.env.MQTT_PASSWORD || '';
const port = process.env.MQTT_PORT || 8883;

const option = {
    port: port,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    clientId: clientId,
    username: username,
    password: password
};

const client = mqtt.connect(`mqtts://${brokerUrl}`, option);

client.on("error", (error) => {
    console.error("MQTT Error: ", error.message);
    client.end();
});

client.on("reconnect", () => {
    console.log("Reconnecting...");
});

export { client };