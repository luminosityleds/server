import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
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

const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion
const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options); // Type assertion

client.on('connect', () => {
  client.subscribe(topic);
});

let message: string | null = null;

client.on('message', async (receivedTopic, msg) => {
  console.log(`Message received on topic ${receivedTopic}`);
  message = msg.toString();
  console.log(`Message received: ${message}`);

  // MongoDB logic for handling received message
  try {
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
      message: message,
    };

    await SubscriptionModel.create(subscription);
  } catch (error) {

    // Simulate a 404 error
    if (!message) {
      throw { status: 404, message: 'Not Found' };
    }

    // Simulate a 403 error
    if (message === 'Forbidden') {
      throw { status: 403, message: 'Forbidden' };
    }

    // Simulate a 401 error
    if (message === 'Unauthorized') {
      throw { status: 401, message: 'Unauthorized' };
    }
    
    console.error(error);
  }
});