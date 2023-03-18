import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import User from '../models/User.js';

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

// add comment
export const addComment = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: 'You need to Login first before comment!' });
      return;
    }

    const { blogId, value } = req.body;

    const blog = await Blog.findOne({ _id: blogId });

    const newComment = {
      userId: user._id,
      username: user.username,
      image: user.picture,
      value,
    };

    blog.comments.push(newComment);

    blog.save();

    res
      .status(201)
      .json({ success: true, message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
