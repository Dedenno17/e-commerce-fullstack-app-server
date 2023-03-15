import express from 'express';
import { createOrder } from '../controllers/order.js';

const router = express.Router();

// create order
router.post('/create', createOrder);

export default router;
