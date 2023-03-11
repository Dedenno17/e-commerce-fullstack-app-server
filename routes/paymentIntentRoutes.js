import express from 'express';
import { createPaymentIntent } from '../controllers/paymentIntent.js';

const router = express.Router();

// create payment intent
router.post('/create-payment-intent', createPaymentIntent);

export default router;
