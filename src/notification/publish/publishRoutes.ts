// publishRoutes.ts
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
  clientId: `publish_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

router.get("/publish/:id", async (req, res) => {
  const client: MqttClient = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT as string, options); // Type assertion
  const event = {
    id: req.params.id,
    message: "From Publish Service",
  };

  client.on('connect', () => {
    console.log("Broker connected");
    client.publish(topic, JSON.stringify(event), {}, async (err) => {
      if (err) {
        console.error(`Error publishing message: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        try {
          // Example MongoDB logic for saving the event
          interface Event extends Document {
            id: string;
            message: string;
          }
          
          const eventSchema = new Schema<Event>({
            id: String,
            message: String,
          });
          
          const EventModel = mongoose.model<Event>('Event', eventSchema);
          await EventModel.create(event);

          res.json(event);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        } finally {
          client.end();
        }
      }
    });
  });

  client.on('error', (error) => {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

router.post("/publish", async (req, res) => {
  try {
    // Example MongoDB logic for handling POST request
    interface Event extends Document {
        id: string;
        message: string;
      }
      
      const eventSchema = new Schema<Event>({
        id: String,
        message: String,
      });
      
    const EventModel = mongoose.model<Event>('Event', eventSchema);
    const event = {
      id: uuidv1(),
      message: req.body.message,
    };

    await EventModel.create(event);

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/publish/:id", async (req, res) => {
  try {
    // Example MongoDB logic for handling DELETE request
    interface Event extends Document {
        id: string;
        message: string;
      }
      
      const eventSchema = new Schema<Event>({
        id: String,
        message: String,
      });
      
    const EventModel = mongoose.model<Event>('Event', eventSchema);
    await EventModel.deleteOne({ id: req.params.id });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;