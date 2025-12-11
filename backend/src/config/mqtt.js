const mqtt = require('mqtt');
const { db } = require('./firebaseAdmin.js');

const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
const topic = process.env.MQTT_TOPIC || 'sensors/fire';
const clientId = process.env.MQTT_CLIENT_ID || 'mqtt_client';
const username = process.env.MQTT_USERNAME || '';
const password = process.env.MQTT_PASSWD || '';

const option = {
    connectTimeout: 4000,

    clientId: clientId,
    username: username,
    password: password
};

const client = mqtt.connect(brokerUrl, option);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topic, (err)=> {
        if (err === null) {
            console.log('Subscribe successfully');
        } else {
            console.error('Subscribe failed: ', err);
        }
    });
});

client.on('message', async (topic, message) => {
    console.log("Message received on topic ", topic, ": ", message.toString());
    try {
        const data = JSON.parse(message.toString());
        const device_id = data['deviceID'];
        const current_time = new Date();
        await db.collection('sensor_data').doc(device_id).set({
            device_id: device_id,
            temperature: data['temperature'],
            co_percent: data['co_percent'],
            has_smoke: data['has_smoke'],
            current_time: toString(current_time)
        });
    } catch (error) {
        console.error("Error handling message: ", error);
    }
});

module.exports =  { client }