import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

// Define routes for users
router.post('/register', userController.registerUser);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id/delete', userController.deleteUserById);

export default router;
