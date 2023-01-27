import express from 'express';
import {
  getReviews,
  createReviews,
  updateReviews,
  getSingleReviews,
} from '../controllers/reviews.js';

const router = express.Router();

// get all reviews
router.get('/', getReviews);

// get single reviews
router.get('/:productId', getSingleReviews);

// create reviews
router.post('/', createReviews);

// update reviews
router.put('/:id', updateReviews);

export default router;
