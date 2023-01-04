const express = require("express");
const User = require("../models/UserSchema")
const router = express.Router()

// Post method
router.post('/register', (req: any, res: any) => {
    const user = new User({
        email:req.body.email,
        name:req.body.name
    })
    user.save()
})

// Get all method

// Get one method

// Update one

// Delete one

// Delete all

module.exports = router
export {}
