const express = require("express");
const User = require("../models/UserSchema");
import publishToQueue from '../notification/publish/publish';
import client from '../notification/subscribe/subscribe';

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
router.get('/users', async (err: any, res: any) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

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

// Update one user method
router.put('/users/:id', async (req: any, res: any) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete one user method
router.delete('/users/:id', async (req: any, res: any) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Delete all users method
router.delete('/users', async (req: any, res: any) => {
    try {
        await User.deleteMany();
        res.status(200).json({ message: 'All users deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete users' });
    }
});

// Route to publish a message to a queue
router.post('/publish', (req: any, res: any) => {
    const { queueName, message } = req.body;
    try {
        publishToQueue(queueName, message);
        res.status(200).json({ message: 'Message published' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to publish message' });
    }
});

// Route to subscribe to a queue
router.post('/subscribe', async (req: any, res: any) => {
    const { queueName } = req.body;
    try {
        // Subscribe to the specified topic
        client.subscribe(queueName, (error) => {
            if (error) {
                console.error("Failed to subscribe:", error);
                res.status(500).json({ error: 'Failed to subscribe to queue' });
            } else {
                res.status(200).json({ message: `Subscribed to queue ${queueName}` });
            }
        });
    } catch (error) {
        console.error("Failed to subscribe:", error);
        res.status(500).json({ error: 'Failed to subscribe to queue' });
    }
});

module.exports = router;