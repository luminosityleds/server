import express from 'express';
import {
  registerAccount,
  getAllAccounts,
  getAccountById,
  deleteAccountById,
} from '../controllers/accountController';

const router = express.Router();

router.post('/accounts/new', registerAccount);
router.get('/accounts/all', getAllAccounts);
router.get('/accounts/:id', getAccountById);
router.delete('/accounts/:id/delete', deleteAccountById);

export default router;
