import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      min: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: String,
    country: String,
    address: String,
    picture: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
