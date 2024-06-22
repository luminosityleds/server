import express from 'express';
import {
  registerAccount,
  getAllAccounts,
  getAccountById,
  deleteAccountById,
  publishMessage,
} from '../controllers/publishController';

const router = express.Router();

router.post('/accounts/new', registerAccount);
router.get('/accounts/all', getAllAccounts);
router.get('/accounts/:id', getAccountById);
router.delete('/accounts/:id/delete', deleteAccountById);
router.get('/:id', publishMessage);

export default router;
