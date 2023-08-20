const express = require("express");
const User = require("../models/UserSchema")

export const router = express.Router()

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

// Update one

// Delete one

// Delete all
module.exports = router

