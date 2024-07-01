import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import routeURLs from "../routes/routes"; <- DEPRECATED
import userRouter from "../routes/userRoutes";
// import publishRouter from "../routes/publishRoutes"; <- DEPRECATED
// import subscribeRouter from "../routes/subscribeRoutes"; <- DEPRECATED

import { connectToMongoDB } from '../db'; // Import the singleton connection function

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

// Connect to MongoDB and start the server
connectToMongoDB().catch(error => {
  console.error(`Error starting Server service: ${error}`);
  process.exit(1); // Exit process if MongoDB connection or server startup fails
});

// Middleware setup
app.use(express.json());
app.use(cors());

// Route setup

// app.use("/app", routeURLs); // Existing routes <- DEPRECATED

app.use("/users", userRouter); // User service routes
// app.use("/publish", publishRouter); // Publish service routes <- DEPRECATED
// app.use("/subscribe", subscribeRouter); // Subscribe service routes <- DEPRECATED

// Start the server
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
