import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from "mongoose";
import dbConfig from './db'; // Import MongoDB configuration from db.ts

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `subscribe_${Math.random().toString(16).substr(2, 8)}`, // Generate random client ID
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options);

// MongoDB connection setup
async function connectToMongoDB() {
  try {
    await mongoose.connect(dbConfig.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1); // Exit process on connection error
  }
}

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

app.listen(port, () => {
  console.log(`Subscribe service is running on port ${port}`);
});
