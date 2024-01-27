import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `subscribe_${uuidv1()}`,
  port: 1883,
};

const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion
const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options); // Type assertion

client.on('connect', () => {
  client.subscribe(topic);
});

let message: string | null = null;

client.on('message', (receivedTopic, res) => {
  console.log(`message received on ${receivedTopic}`);
  message = res.toString();
  console.log(`message received: ${message}`);
});