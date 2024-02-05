import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const server = express();
const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `publish_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

// MongoDB event schema and model
interface Event extends Document {
  id: string;
  message: string;
}

const eventSchema = new Schema<Event>({
  id: String,
  message: String,
});


const EventModel = mongoose.model<Event>('Event', eventSchema);

server.get("/publish/events", async (_req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.get("/publish/events/:id", async (req, res) => {
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

server.post("/publish/events", async (req, res) => {
  try {
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

server.delete("/publish/events/:id", async (req, res) => {
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

export default server;