import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@luminositycluster-0.cgornhw.mongodb.net/?retryWrites=true&w=majority`; //MongoDb Connection String

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } as any);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default {
  dbURI
};