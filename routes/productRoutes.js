import express from 'express';
import {
  getProducts,
  getSingleProduct,
  getProductSearch,
} from '../controllers/products.js';

const router = express.Router();

// get all products
router.get('/', getProducts);

// get a single product
router.get('/find/:id', getSingleProduct);

// get products from search
router.get('/search', getProductSearch);

export default router;
