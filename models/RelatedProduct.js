import mongoose from 'mongoose';

const RelatedProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    relatedProducts: [
      {
        _id: { type: String, required: true, unique: true },
        title: { type: String, required: true, unique: true },
        img: { type: String, required: true },
        price: { type: Number },
        favourite: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const RelatedProduct = mongoose.model('RelatedProduct', RelatedProductSchema);
export default RelatedProduct;
