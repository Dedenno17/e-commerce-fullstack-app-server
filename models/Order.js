import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    products: [
      {
        prodcutsId: { type: mongoose.Types.ObjectId },
        title: { type: String, required: true },
        color: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered'],
      default: 'pending',
    },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
