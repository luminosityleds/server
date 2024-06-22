import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `publish_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options);

client.on('connect', () => {
  console.log("Broker connected");
});

client.on('error', (error) => {
  console.error(error);
});

const publishRouter = express.Router();

publishRouter.post('/publish', (req, res) => {
  const event = {
    id: uuidv1(),
    message: "Hello from Publish Service",
  };

  client.publish(topic, JSON.stringify(event), {}, (err) => {
    if (err) {
      console.error(`Error publishing message: ${err}`);
      res.status(500).json({ error: 'Failed to publish message' });
    } else {
      console.log(`Published message: ${JSON.stringify(event)} to topic ${topic}`);
      res.status(200).json({ message: 'Message published successfully' });
    }
  });
});

export { publishRouter };
