import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

// routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';
import reviewsRoutes from './routes/reviewsRoute.js';
import blogRoutes from './routes/blogRoutes.js';

// import Product from './models/Product.js';
// import Blog from './models/Blog.js';
// import RelatedProduct from './models/RelatedProduct.js';
// import { relatedProductsData } from './data/relatedProductsData.js';
// import { productsData, blogsData } from './data/index.js';

// cors onfiguration
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'token'],
};

// SETUP
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// ROUTES
// app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/blogs', blogRoutes);

// connect to mongodb
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connect to mongodb is successful!');
  })
  .catch((err) => console.log({ err }));

// port
const PORT = process.env.PORT || 9000;

// running server
app.listen(PORT, () => console.log(`server is running at ${PORT}`));
