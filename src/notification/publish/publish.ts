import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from "mongoose";
import dbConfig from './db'; // Import MongoDB configuration from db.t

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `publish_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

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
  console.error(`Error starting Publish service: ${error}`);
  process.exit(1); // Exit process if MongoDB connection or server startup fails
});

app.get("/publish/:id", async (req, res) => {
  const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options); // Type assertion
  const event = {
    id: req.params.id,
    message: "From Publish Service",
  };

  client.on('connect', () => {
    console.log("Broker connected");
    client.publish(topic, JSON.stringify(event), {}, (err) => {
      if (err) {
        console.error(`Error publishing message: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        client.end();
        res.json(event);
      }
    });
  });

  client.on('error', (error) => {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.listen(port, () => {
  console.log(`Publish service is running on port ${port}`);
});
