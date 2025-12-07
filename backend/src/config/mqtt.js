const mqtt = require('mqtt');
const { db } = require('./firebaseAdmin.js');

const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
const topic = process.env.MQTT_TOPIC || 'sensors/fire';

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log("Connected to MQTT broker at ", brokerUrl);

    client.subscribe(topic, (err) => {
        if (err === null) {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    const payload = JSON.parse(message.toString());

    // Write to Firestore database
    db.collection('sensorData').add({
        deviceId: payload.deviceId,
        smokeLevel: payload.smokeLevel,
    });
});