const mqtt = require('mqtt');
const uuid = require('uuid');
let options = {
username: process.env.ACTIVE_MQ_USERNAME,
password: process.env.ACTIVE_MQ_PASWORD,
clientId: `subscribe_${uuid.v1()}`,
port: 1883
};
let topic = process.env.ACTIVE_MQ_TOPIC;
const client = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT, options);
client.on('connect', () => {
client.subscribe(topic);
});
let message = null;
client.on('message', (topic, res) => {
console.log(`message received on ${topic}`);
message = res.toString();
console.log(`message received: ${message}`);
});