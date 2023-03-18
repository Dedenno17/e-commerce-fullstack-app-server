import express from 'express';
import { getBlogs, getSingleBlog, addComment } from '../controllers/blog.js';

const router = express.Router();

// get all blog
router.get('/', getBlogs);

// get single blog
router.get('/:id', getSingleBlog);

// add comments in blog
router.post('/comment/:id', addComment);

export default router;
