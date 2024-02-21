import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
import db from '../publish/db';
import { v1 as uuidv1 } from 'uuid';
import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `subscribe_${uuidv1()}`,
  port: 1883,
};

const topic = process.env.ACTIVE_MQ_TOPIC as string;

router.get("/subscribe/:id", async (req: express.Request, res: express.Response) => {
  try {
    // Example MongoDB logic for retrieving a specific subscription
    interface Subscription extends Document {
      id: string;
      message: string;
    }

    const subscriptionSchema = new Schema<Subscription>({
      id: String,
      message: String,
    });

    const SubscriptionModel = mongoose.model<Subscription>('Subscription', subscriptionSchema);
    const subscriptionFromDB = await SubscriptionModel.findOne({ id: req.params.id });

    if (!subscriptionFromDB) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }

    const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options); // Type assertion

    const subscription = {
      id: subscriptionFromDB.id,
      message: subscriptionFromDB.message,
    };

    client.on('connect', () => {
      console.log("Broker connected");
      client.publish(topic, JSON.stringify(subscription), {}, (err) => {
        if (err) {
          console.error(`Error publishing message: ${err}`);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          client.end();
          res.json(subscription);
        }
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/subscribe", async (req: express.Request, res: express.Response) => {
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

router.delete("/subscribe/:id", async (req: express.Request, res: express.Response) => {
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