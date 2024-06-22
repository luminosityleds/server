import { Request, Response } from 'express';
import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import db from '../notification/publish/db'; // Import the db.ts file to access the dbURI variable
import Device from '../models/DeviceSchema'; // Import Device model
import User from '../models/UserSchema'; // Import User model

const options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASSWORD,
  clientId: `publish_${uuidv1()}`,
  port: 1883,
};
const topic = process.env.ACTIVE_MQ_TOPIC as string; // Type assertion

// Establish Mongoose connection
mongoose.connect(db.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Register account
export const registerAccount = async (req: Request, res: Response) => {
  try {
    const { email, name, deletionDate, devicesLinked } = req.body;
    const currentDate = new Date(); // Set current timestamp
    const newAccountData = {
      email,
      name,
      creationDate: currentDate,
      lastUpdated: currentDate,
      deletionDate: deletionDate ? new Date(deletionDate) : null,
    };

    const newAccount = new User(newAccountData);

    // Handle devicesLinked
    if (devicesLinked && devicesLinked.length > 0) {
      const devices = await Device.insertMany(devicesLinked); // Use Device to refer to the Device model
      newAccount.devicesLinked = devices.map((device: any) => device._id); // Use explicit typing or adjust as needed
    } else {
      newAccount.devicesLinked = [];
    }

    const savedAccount = await newAccount.save(); // Save the new account to the database
    res.status(201).json(savedAccount); // HTTP 201 Created status code for successful creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all accounts
export const getAllAccounts = async (_req: Request, res: Response) => {
  try {
    const events = await User.find(); // Use User model
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get account by ID
export const getAccountById = async (req: Request, res: Response) => {
  try {
    const event = await User.findById(req.params.id); // Use User model

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
};

// Delete account by ID
export const deleteAccountById = async (req: Request, res: Response) => {
  try {
    const events = await User.findByIdAndDelete(req.params.id); // Use User model

    if (!events) {
      // If the document doesn't exist, return a 404 Not Found response
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    // If the document is successfully deleted, return a success message
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    // If an error occurs during deletion, return a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Publish message to MQTT
export const publishMessage = async (req: Request, res: Response) => {
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
};
