import express from 'express';
import { createCart } from '../controllers/cart.js';

const router = express.Router();

// create order
router.post('/create', createOrder);

export default router;
