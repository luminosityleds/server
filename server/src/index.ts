import express, {Request, Response} from 'express'; 
import mongoose from 'mongoose';

const USR = process.env.MONGO_INITDB_ROOT_USERNAME;
const PSW = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB = process.env.MONGO_INITDB_DATABASE;

const app = express();
const router = express.Router();
app.use(express.json());

function mongodb_connect() {
    // Function to test mongodb connection.  Approved IP address must be added to mongodb cluster.
    console.log(mongoose.connection.readyState);

    mongoose.connection.on('disconnected', () => {
        console.log('disconnected');
        console.log(mongoose.connection.readyState); //logs 0
      });
    
    mongoose.connection.on('connected', () => {
      console.log('connected');
      console.log(mongoose.connection.readyState); //logs 1
    });
    
    mongoose.connection.on('connecting', () => { 
        console.log('connecting')
        console.log(mongoose.connection.readyState); //logs 2
      });
    
    mongoose.connection.on('disconnecting', () => {
      console.log('disconnecting');
      console.log(mongoose.connection.readyState); // logs 3
    });
    
    mongoose.connect(`mongodb+srv://${USR}:${PSW}@${DB}.cgornhw.mongodb.net/test`);
}

mongodb_connect();

app.post('/login', (req: Request, res: Response) => {
  const username : string | null = req.body.username;
  const password : string | null = req.body.password;

  res.send("Post request received");

  if (!username) {
    res.send("Username cannot be empty");
  }
  if (!password) {
    res.send("Password cannot be empty");
  }
  else {
    res.send("Working!");
  }

})

mongoose.disconnect();
