import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

// get all blog
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single blog
export const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
