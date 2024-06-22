import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import routeURLs from "../routes/routes";
import accountRouter from "../routes/accountRoutes";
import publishRouter from "../routes/publishRoutes";
import subscribeRouter from "../routes/subscribeRoutes";

// TODO: Remove, deprecate, or archive unused commented out code
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use(routeURLs);
// app.use("/account", accountRouter);
// app.use("/publish", publishRouter);
// app.use("/subscribe", subscribeRouter);

// MongoDB Connection
// const uri = process.env.MONGODB_URI as string;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// MongoDB URL
const URL = process.env.MONGO_DB_URL;

// Verify that URL is defined
if (URL) {
  const mongo_connect = mongoose.createConnection(URL);
  mongo_connect.on(`error`, console.error.bind(console, `connection error:`));
  mongo_connect.once(`open`, () => {
    // Successful connection!
    console.log("MongoDB database connection established successfully");
  });
} else {
  console.error("MongoDB URL is not defined in .env file.");
}

// Middleware setup
app.use(express.json());
app.use(cors());

// Route setup
app.use("/app", routeURLs); // Existing routes
app.use("/account", accountRouter); // Account service routes
app.use("/publish", publishRouter); // Publish service routes
app.use("/subscribe", subscribeRouter); // Subscribe service routes

// Start the server
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
