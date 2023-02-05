import express from 'express';
import { verifyToken, verifyTokenAndAuthorization } from './verifyToken.js';
import { createCart, getCart, updateCart } from '../controllers/cart.js';

const router = express.Router();

// create cart
router.post('/', verifyToken, createCart);

// get user cart
router.get('/find/:id', verifyTokenAndAuthorization, getCart);

// update cart
router.put('/:id', verifyTokenAndAuthorization, updateCart);

export default router;
