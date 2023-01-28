const express = require("express");
const User = require("../models/UserSchema")
import { Response } from 'express';

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
router.get('/account', (req: any, res: any) => {
    User.findOne({email: req.headers.email}, function(err: any, result: any) {
        if (err) {
            res.json({success: false, message: 'Invalid credentials'})
            console.log(err)
        }
        else if (result === null) {
            res.json({success: false, message: "User doesn't exist"})
            console.log("The result is: ", result)
        }
        else {
            res.json({success: true, message: "Successful login"})
            console.log("The result is: ", result)
        }
    });
})

// Update one

// Delete one

// Delete all
module.exports = router

