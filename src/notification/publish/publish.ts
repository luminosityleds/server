import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
import { v1 as uuidv1 } from 'uuid';
import mongoose, { Schema, Document, ConnectOptions } from 'mongoose';
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
server.use(express.json());
// MongoDB event schema and model
interface accounts extends Document {
  creationDate: Date;
  deletionDate?: Date;
  lastUpdated: Date; // Making lastUpdated required
  email: string;
  name: string;
  devicesLinked?: {};
}

const accountSchema = new Schema<accounts>({
  creationDate: { type: Date, required: true },
  deletionDate: { type: Date },
  lastUpdated: { type: Date, required: true }, // Making lastUpdated required
  email: { type: String, required: true },
  name: { type: String, required: true },
  devicesLinked: { type: Schema.Types.Mixed }
});

// Establish Mongoose connection
mongoose.connect(db.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
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
      const { email, name, deletionDate, devicesLinked } = req.body;
      const currentDate = new Date(); // Set current timestamp
      const newUserData = {
        email,
        name,
        creationDate: currentDate,
        lastUpdated: currentDate,
        deletionDate: deletionDate ? new Date(deletionDate) : null,
        devicesLinked: devicesLinked ? devicesLinked : []
      };
  
      const newUser = new EventModel(newUserData);
  
      const savedUser = await newUser.save(); // Save the new user to the database
      res.status(201).json(savedUser); // HTTP 201 Created status code for successful creation
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  server.delete("/publish/accounts/:id/delete", async (req, res) => {
    try {
      const events = await EventModel.findByIdAndDelete(req.params.id);
  
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