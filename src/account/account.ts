import express from "express";
import { User } from "../models/UserSchema";

// Account microservice port
export const PORT = 5000;

// Creates an Express application
export const app = express();

// Single Routing
export const router = express.Router()

// Defines the structure of the error Object
interface ErrorWithMessage {
    message: string
}

// Register method
router.post('/register', (req: any, res: any) => {
    const user = new User({
        email:req.body.email,
        name:req.body.name
    })
    user.save(function (err: any, res: any) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(res)
        }
    })
})

// Get all method

// Get one method
router.post('/account', async (req: any, res: any) => {
    User.find({}, function(err: any, users: any) {
        let loginIn = false
        
        // Check if one of the users in the db is already present
        // If so set that equal to flag, if not then indicate the user isn't registered
        users.forEach(function(user: any) {
          if (req.body.email === user.email)
            loginIn = true
        });
        
        res.send({'success' : loginIn});
    });
})

// Use routes provided by the router
app.use(router)

app.listen(PORT, () => {
    console.log("Account microservice listening on port: " + PORT)
})

// Update one

// Delete one

// Delete all
module.exports = router


