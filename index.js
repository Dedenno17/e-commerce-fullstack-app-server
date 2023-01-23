import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

// routes
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import productRoutes from './routes/product.js';

// SETUP
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);

// connect to mongodb
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connect to mongodb is successful!'))
  .catch((err) => console.log({ err }));

// port
const PORT = process.env.PORT || 9000;

// running server
app.listen(PORT, () => console.log(`server is running at ${PORT}`));
