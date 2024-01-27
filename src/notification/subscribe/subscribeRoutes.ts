// subscribeRoutes.ts
import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
import db from '/workspaces/server/src/notification/db';  // Assuming your MongoDB connection file is in the same directory
import { v1 as uuidv1 } from 'uuid';
import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();
const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `subscribe_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

router.get("/subscribe", (_req, res) => {
  const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options); // Type assertion

  client.on('connect', () => {
    client.subscribe(topic);
    res.json({ message: 'Subscribed to MQTT topic' });
  });

  let message: string | null = null;

  client.on('message', (receivedTopic, msg) => {
    console.log(`Message received on topic ${receivedTopic}`);
    message = msg.toString();
    console.log(`Message received: ${message}`);
  });

  client.on('error', (error) => {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

router.post("/subscribe", async (req, res) => {
  try {
    // Example MongoDB logic for handling POST request
    interface Subscription extends Document {
        id: string;
        message: string;
      }
      
      const subscriptionSchema = new Schema<Subscription>({
        id: String,
        message: String,
      });
      
    const SubscriptionModel = mongoose.model<Subscription>('Subscription', subscriptionSchema);
    const subscription = {
      id: uuidv1(),
      message: req.body.message,
    };

    await SubscriptionModel.create(subscription);

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/subscribe/:id", async (req, res) => {
  try {
    // Example MongoDB logic for handling DELETE request
    interface Subscription extends Document {
        id: string;
        message: string;
      }
      
      const subscriptionSchema = new Schema<Subscription>({
        id: String,
        message: String,
      });
      
    const SubscriptionModel = mongoose.model<Subscription>('Subscription', subscriptionSchema);
    await SubscriptionModel.deleteOne({ id: req.params.id });

    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;