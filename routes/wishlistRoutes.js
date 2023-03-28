import express from 'express';
import { verifyTokenAndAuthorization } from '../routes/verifyToken.js';
import {
  updateWishlist,
  getWishlist,
  createWishlist,
} from '../controllers/wishlist.js';

const router = express.Router();

// create wishlist
router.post('/create', createWishlist);

// get wishlist
router.get('/find/:id', verifyTokenAndAuthorization, getWishlist);

// add wishlist
router.put('/update/:id', verifyTokenAndAuthorization, updateWishlist);

// remove wishlist
// router.put('/remove/:id', verifyTokenAndAuthorization, removeWishlist);

export default router;
