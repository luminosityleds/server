// publishRoutes.ts
import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
import db from '/workspaces/server/src/notification/db';
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

// GET all events
router.get("/publish/events", async (_req, res) => {
  try {
    const EventModel = mongoose.model<Event>('Event');
    const events = await EventModel.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific event by ID
router.get("/publish/events/:id", async (req, res) => {
  try {
    const EventModel = mongoose.model<Event>('Event');
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new event
router.post("/publish/events", async (req, res) => {
  try {
    const EventModel = mongoose.model<Event>('Event');
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

// DELETE a specific event by ID
router.delete("/publish/events/:id", async (req, res) => {
  try {
    const EventModel = mongoose.model<Event>('Event');
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

export default router;