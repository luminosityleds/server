import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

// Define routes for users (formerly both user and account routes)
router.post('/users/register', userController.registerUser);
router.get('/users/all', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id/delete', userController.deleteUserById);

export default router;
