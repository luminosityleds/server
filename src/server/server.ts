const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const publishRouter = require('../src/publish/publishRoutes');
const subscribeRouter = require('../src/subscribe/subscribeRoutes');
const routeURLs = require('../src/routes/routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// MongoDB connection
const USR = process.env.MONGO_INITDB_ROOT_USERNAME;
const PSW = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB = process.env.MONGO_INITDB_DATABASE;

mongoose.connect(`mongodb+srv://${USR}:${PSW}@${DB}.cgornhw.mongodb.net/Luminosity`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Database is connected');
}).catch((error: any) => {
  console.error('Database connection error:', error);
});

// Middleware setup
app.use(express.json());
app.use(cors());

// Route setup
app.use('/app', routeURLs); // Existing routes
app.use('/publish', publishRouter); // Publish service routes
app.use('/subscribe', subscribeRouter); // Subscribe service routes

// Start the server
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
