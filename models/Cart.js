import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    products: [
      {
        prodcutsId: { type: mongoose.Types.ObjectId },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
