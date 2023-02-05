import express from 'express';
import { verifyTokenAndAuthorization } from './verifyToken.js';
import { createCart, getCart, updateCart } from '../controllers/cart.js';

const router = express.Router();

// create cart
router.post('/', verifyTokenAndAuthorization, createCart);

// get user cart
router.get('/find/:userId', verifyTokenAndAuthorization, getCart);

// update cart
router.put('/:id', verifyTokenAndAuthorization, updateCart);

export default router;
