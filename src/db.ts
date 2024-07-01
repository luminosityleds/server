import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@luminositycluster-0.cgornhw.mongodb.net/Luminosity`;

let isConnected = false;

export const connectToMongoDB = async () => {
  if (isConnected) {
    console.log('MongoDB connection is already established');
    return;
  }

  try {
    await mongoose.connect(dbURI, {
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1); // Exit process on connection error
  }
};

export default {
  dbURI,
  connectToMongoDB
};
