import express from "express";
const User = require("../models/UserSchema");
import publishRouter from '../notification/publish/publish';
import subscribeRouter from '../notification/subscribe/subscribe';

const router = express.Router();

// Register method
router.post('/register', (req: any, res: any) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name
    });
    user.save(function (err: any) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to register user' });
        } else {
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
});

// Get all method
router.get('/users', async (req: any, res: any) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get one method
router.post('/account', async (req: any, res: any) => {
    try {
        const users = await User.find();
        const loginIn = users.some((user: any) => req.body.email === user.email);
        res.status(200).json({ success: loginIn });
    } catch (err) {
        res.status(500).json({ error: 'Failed to check account' });
    }
});

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

// Mount the publish and subscribe routers
router.use('/publish', publishRouter);
router.use('/subscribe', subscribeRouter);

module.exports = router;
