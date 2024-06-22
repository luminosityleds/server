import express from 'express';
import { checkSubscriptionStatus } from '../controllers/subscribeController';

const router = express.Router();

router.get('/status', checkSubscriptionStatus);

export default router;
