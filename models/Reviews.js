import mongoose from 'mongoose';

const ReviewsSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Types.ObjectId, required: true },
    reviews: [
      {
        userId: { type: mongoose.Types.ObjectId, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        review: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Reviews = mongoose.model('Reviews', ReviewsSchema);
export default Reviews;
