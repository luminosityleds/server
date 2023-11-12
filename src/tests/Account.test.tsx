import express from "express";
import { IUserSchema } from "../IUserSchema";
// import cors from "cors";
import { MongoClient } from "mongodb";
import { config } from "../config";

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
// export async function connect(): Promise<boolean> {
//   try {
//     await MONGO_CLIENT.connect();
//     console.log("Successfully connected to MongoDB.");
//     return true;
//   } catch (err) {
//     console.error("Error connecting to MongoDB " + err);
//     return false;
//   }
// }

export async function registerAccount(req: any, res: any): Promise<void> {
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

// Find and return the document
    const filter = { "name.last": "Turing" };
    const document = await col.findOne(filter);
    console.log("Document found:\n" + JSON.stringify(document)); //this was previously commented out
    } catch (err: any) {
        console.log("Error " + err.stack);
        console.log("Response " + res);
    }
}