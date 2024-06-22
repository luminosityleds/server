import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `subscribe_${Math.random().toString(16).substr(2, 8)}`, // Generate random client ID
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options);

client.on('connect', () => {
  console.log("Broker connected");
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Error subscribing to topic: ${err}`);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message from topic ${topic}: ${message.toString()}`);
  // Process the received message as needed
});

client.on('error', (error) => {
  console.error(error);
});

const subscribeRouter = express.Router();

// Define subscription routes if needed
// Example:
// subscribeRouter.get('/subscribe', (req, res) => {
//   res.send('Subscribe endpoint');
// });

export { subscribeRouter };