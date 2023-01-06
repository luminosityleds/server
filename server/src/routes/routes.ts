const express = require("express");
const User = require("../models/UserSchema")

export const router = express.Router()

// Post method
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
router.get('/get/:email', (req: any, res: any) => {
    User.findOne({email: req.body.email}, function(err: any, res: any) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(res)
        }
    })
})

// Update one

// Delete one

// Delete all
module.exports = router

