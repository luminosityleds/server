const server = require("express")();
const mqtt = require('mqtt');
const uuid = require('uuid');
let options = {
username: process.env.ACTIVE_MQ_USERNAME,
password: process.env.ACTIVE_MQ_PASWORD,
clientId: `publish_${uuid.v1()}`,
port: 1883
};
let topic = process.env.ACTIVE_MQ_TOPIC;
server.get("/publish/:id", async (req, res) => {
const client = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT, options);
let event = {
id: req.params.id,
message: "From Publish Service"
};
client.on('connect', () => {
console.log("Broker connected");
client.publish(topic, JSON.stringify(event));
client.end();
res.json(event);
});
client.on('error', (error) => {
console.log(error);
});
});
server.listen(3000, async () => { console.log("Server connected") });
