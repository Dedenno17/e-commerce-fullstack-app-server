import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    colors: { type: Array },
    price: { type: Number },
    favourite: { type: Number },
    discount: { type: Number },
    rating: { type: Number },
    info: { type: Object, required: true, default: null },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
