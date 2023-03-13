import express from 'express';
import { createPaymentIntent } from '../controllers/paymentIntent.js';

const router = express.Router();

// create payment intent
router.post('/', createPaymentIntent);

export default router;
