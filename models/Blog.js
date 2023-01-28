import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    atuhor: { type: String, required: true },
    content: { type: String, required: true, min: 200 },
    img: { type: String, required: true },
    categories: { type: Array },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
