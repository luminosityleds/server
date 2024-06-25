import express from 'express';
import { publishMessage } from '../controllers/publishController';

const router = express.Router();

router.get('/:id', publishMessage);

export default router;
