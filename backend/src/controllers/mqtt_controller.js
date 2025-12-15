import { client } from '../config/mqtt.js'
import { handleIncoming } from './pushsafer_controller.js';

const topic = process.env.MQTT_TOPIC || '';
const qos = Number(process.env.QOS) || 0;
const retain = Boolean(process.env.RETAIN) || false;

function init() {
    client.on("connect", () => {
        client.subscribe(topic);
    });

    client.on("message", (topic, message) => {
        handleIncoming(topic, message);
    })
}

function publish(payload) {
    if (client === null) {
        console.error("MQTT Client not initialized");
        return;
    } 

    client.publish(topic, payload, {qos: qos, retain: retain}, (err) => {
        if (err) {
            console.error("Error: ", err.message);
        } else {
            console.log("Published");
        }
    });
}

export const mqtt_controller = {
    init,
    publish
}