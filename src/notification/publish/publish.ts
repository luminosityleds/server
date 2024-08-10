import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import dotenv from 'dotenv';
import express from 'express';
import { connectToMongoDB } from './db'; // Import the singleton connection function

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `publish_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string;

// Connect to MongoDB and start the server
connectToMongoDB().catch(error => {
  console.error(`Error starting Publish service: ${error}`);
  process.exit(1); // Exit process if MongoDB connection or server startup fails
});

app.get("/publish/:id", async (req, res) => {
  const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options);
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

  client.on('error', (error: Error) => {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.listen(port, () => {
  console.log(`Publish service is running on port ${port}`);
});
