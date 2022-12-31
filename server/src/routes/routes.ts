const express = require("express");
const userModel = require("../models/UserSchema")
const app = express();

// Post method
app.post('/post', (req: any, res: { send: (arg0: string) => void; }) => {
    const data = new userModel({
        
    })
})

// Get all method
app.post('/getAll', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Get all')
})

// Get one method

// Update one

// Delete one

// Delete all