// // TODO: Remove, deprecate, or archive unused commented out code

// import { Request, Response } from 'express';
// import mqtt, { MqttClient } from 'mqtt';
// import { v4 as uuidv4 } from 'uuid';
// import mongoose, { Schema, Document } from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// const options = {
//   username: process.env.ACTIVE_MQ_USERNAME,
//   password: process.env.ACTIVE_MQ_PASSWORD,
//   clientId: `subscribe_${uuidv4()}`,
//   port: 1883,
// };

// const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion
// const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options); // Type assertion

// client.on('connect', () => {
//   client.subscribe(topic);
// });

// let message: string | null = null;

// client.on('message', async (receivedTopic, msg) => {
//   console.log(`Message received on topic ${receivedTopic}`);
//   message = msg.toString();
//   console.log(`Message received: ${message}`);

//   // MongoDB logic for handling received message
//  try {
//   interface SubscriptionInterface extends Document {
//     id: string;
//     message: string;
//   }

//   const subscriptionSchema = new Schema<SubscriptionInterface>({
//     id: String,
//     message: String,
//   });

//   // Check if the model already exists before defining it
//   const SubscriptionModel = mongoose.models.Subscription || mongoose.model<SubscriptionInterface>('Subscription', subscriptionSchema);

//   const subscription = {
//     id: uuidv4(),
//     message: message,
//   };

//   await SubscriptionModel.create(subscription);
// } catch (error) {

//     // Simulate a 404 error
//     if (!message) {
//       throw { status: 404, message: 'Not Found' };
//     }

//     // Simulate a 403 error
//     if (message === 'Forbidden') {
//       throw { status: 403, message: 'Forbidden' };
//     }

//     // Simulate a 401 error
//     if (message === 'Unauthorized') {
//       throw { status: 401, message: 'Unauthorized' };
//     }
    
//     console.error(error);
//   }
// });

// // Check subscription status
// export const checkSubscriptionStatus = (req: Request, res: Response) => {
//   res.status(200).json({ message: 'Subscriber is running' });
// };
