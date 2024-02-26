import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import db from './db'; // Import the db.ts file to access the dbURI variable

const server = express();
const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `publish_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

// MongoDB event schema and model
interface accounts extends Document {
  email: string;
  name: string;
}

const accountSchema = new Schema<accounts>({
  email: String,
  name: String,
});

// Establish Mongoose connection
mongoose.connect(db.dbURI)
.then(() => {
  console.log('MongoDB connected');

  // Define Mongoose model after connection is established
  const EventModel = mongoose.model<accounts>('accounts', accountSchema);

  // Define routes and other server logic after the connection is established

  server.get("/publish/accounts/all", async (_req, res) => {
    try {
      const events = await EventModel.find();
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.get("/publish/accounts/:id", async (req, res) => {
    try {
      const event = await EventModel.findById(req.params.id);

      if (!event) {
        res.status(404).json({ error: 'Event not found' });
        return;
      }

      if (!req.params.id) {
        res.status(400).json({ error: 'Bad Request' });
        return;
      }

      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.post("/publish/accounts/new", async (req, res) => {
    try {
      const eventData = {
        email: req.body.email,
        name: req.body.name,
      };
  
      const newEvent = await EventModel.create(eventData);
  
      res.status(201).json(newEvent); // HTTP 201 Created status code for successful creation
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.delete("/publish/accounts/:id/delete", async (req, res) => {
    try {
      const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);

      if (!deletedEvent) {
        res.status(404).json({ error: 'Event not found' });
        return;
      }

      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.get("/publish/:id", async (req, res) => {
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

    client.on('error', (error) => {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  });

  server.listen(4000, () => {
    console.log("Server connected");
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

export default server;