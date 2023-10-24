import express from "express";
import { IUserSchema } from "./IUserSchema";
import cors from "cors";
import { MongoClient } from "mongodb";
import { config } from "./config";

// Information that allows microservice to talk with MongoDB
// USR (username), PSW (password), CLUS (cluster), DB (database) are defined before running docker container
export const USR = config.mongodb.username;
export const PSW = config.mongodb.password;
export const CLUS = config.mongodb.clustername;
export const DB = config.mongodb.database;
export const COL = config.mongodb.collection;

// Information about the microservice
export const MICROSERVICE = config.microservice.account;
export const PORT = config.microservice.port;

// URL to mongoDB cluster
export const URL = `mongodb+srv://${USR}:${PSW}@${CLUS}.cgornhw.mongodb.net/Luminosity`;

// Creates an Express application
export const app = express();

// Single Routing
export const router = express.Router();

// Mongo Client object
export const MONGO_CLIENT = new MongoClient(URL);

// Connect to the Atlas cluster
async function connect() {
  try {
    await MONGO_CLIENT.connect();
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Error connecting to MongoDB " + err);
  }
}

// Register method
router.get("/register", (req: any, res: any) => {
  async function registerAccount() {
    try {
      // Create a new document
      let accountDocument: IUserSchema = {
        creationDate: {
          value: Date.now()
        },
        deletionDate: {
          value: Date.now()
        },
        lastUpdated: {
          value: Date.now()
        }, 
        email: {
          value: req.body.email,
        },
        name: {
          value: req.body.name,
        }, 
        devicesLinked: {
          value: {}
        } 
      };

      // Pick database to connect to with mongo client
      const mongo_db = MONGO_CLIENT.db(DB);

      // Reference the "accounts" collection in the specified database
      const col = mongo_db.collection(COL);

      // Insert the document into the specified collection
      await col.insertOne(accountDocument);
      console.log("Account registered successfully");

      // TODO: Use this code for unit tests
      // // Find and return the document
      // const filter = { "name.last": "Turing" };
      // const document = await col.findOne(filter);
      // console.log("Document found:\n" + JSON.stringify(document));
    } catch (err: any) {
      console.log("Error " + err.stack);
      console.log("Response " + res);
    }
  }
  registerAccount().catch(console.dir);
});

// Get all method

// Get one method
// FIXME: User constant was removed which causes route to fail to compile
// router.post("/account", async (req: any, res: any) => {
//   User.find({}, function (err: any, users: any) {
//     let loginIn = false;

//     // Check if one of the users in the db is already present
//     // If so set that equal to flag, if not then indicate the user isn't registered
//     users.forEach(function (user: any) {
//       if (req.body.email === user.email) loginIn = true;
//     });

//     res.send({ success: loginIn });
//   });
// });

// Returns JSON from expressJS server
app.use(express.json());

// Allows server to indicate its origin (domain, scheme, or port)
app.use(cors());

// Use routes provided by the router
app.use(router);

// ExpressJS listens on defined port
app.listen(PORT, () => {
  console.log(MICROSERVICE + " microservice listening on port: " + PORT);
});

connect();

// Update one

// Delete one

// Delete all
module.exports = router;
