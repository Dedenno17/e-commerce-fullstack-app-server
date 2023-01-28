import express from 'express';
import { getBlogs, getSingleBlog } from '../controllers/blog.js';

const router = express.Router();

// get all blog
router.get('/', getBlogs);

// get single blog
router.get('/:id', getSingleBlog);

export default router;
