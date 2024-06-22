import express from 'express';
const User = require('../models/UserSchema');
import { publishRouter } from '../notification/publish/publish';
import { subscribeRouter } from '../notification/subscribe/subscribe';

const router = express.Router();

// Register method
router.post('/register', (req: any, res: any) => {
    const { email, name, creationDate, lastUpdated, deletionDate, devicesLinked } = req.body;

    // Validate required fields
    if (!email || !name || !creationDate || !lastUpdated) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = new User({
        email,
        name,
        creationDate: new Date(creationDate),
        lastUpdated: new Date(lastUpdated),
        deletionDate: deletionDate ? new Date(deletionDate) : undefined,
        devicesLinked: devicesLinked || [],
    });

    user.save((err: any) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to register user' });
        } else {
            return res.status(201).json({ message: 'User registered successfully' });
        }
    });
});

// Get all users method
router.get('/users', async (req: any, res: any) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get one user by ID method
router.get('/users/:id', async (req: any, res: any) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
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

export default router;
