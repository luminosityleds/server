import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';
import express from 'express';
import { Request, Response } from 'express';
import { connectToMongoDB } from './db'; // Import the singleton connection function

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `subscribe_${Math.random().toString(16).substr(2, 8)}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string;

const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options);

// Connect to MongoDB and start the server
connectToMongoDB().catch(error => {
  console.error(`Error starting Subscribe service: ${error}`);
  process.exit(1); // Exit process if MongoDB connection or server startup fails
});

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
});

client.on('error', (error: Error) => {
  console.error(error);
});

const subscribeRouter = express.Router();

subscribeRouter.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Subscriber is running' });
});

app.use('/subscribe', subscribeRouter);

app.listen(port, () => {
  console.log(`Subscribe service is running on port ${port}`);
});
