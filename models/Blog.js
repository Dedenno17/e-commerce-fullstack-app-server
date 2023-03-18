import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    atuhor: { type: String, required: true },
    content: { type: String, required: true, min: 200 },
    img: { type: String, required: true },
    categories: { type: Array },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        username: { type: String, required: true },
        image: { type: String },
        value: { type: String, required: true },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
