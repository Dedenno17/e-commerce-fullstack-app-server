import Product from '../models/Product.js';
import RelatedProduct from '../models/RelatedProduct.js';

// get all products
export const getProducts = async (req, res) => {
  const { discount, rating, categories, price, color } = req.query;

  try {
    // Create an empty filter object
    const filter = [];

    // Check if categories query exists and add it to the filter object
    if (categories) {
      filter.push({ categories: { $in: [categories] } });
    }

    // Check if price query exists and add it to the filter object
    if (price) {
      filter.push({ price: { $lte: price } });
    }

    // Check if discount query exists and add it to the filter object
    if (discount) {
      filter.push({ discount: { $gt: discount } });
    }

    // Check if color query exists and add it to the filter object
    if (color) {
      filter.push({ colors: { $regex: color } });
    }

    // Check if rating query exists and add it to the filter object
    if (rating) query.push({ rating: { $gte: rating } });

    // Find products based on the filter object
    let products;

    if (filter.length !== 0) {
      products = await Product.find({ $or: filter });
    } else {
      products = await Product.find();
    }

    // Return found products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single product
export const getSingleProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get product from search
export const getProductSearch = async (req, res) => {
  const query = req.query.q;

  try {
    const products = await Product.find({
      $or: [{ title: { $regex: query } }, { categories: { $in: [query] } }],
    });

    if (!products) {
      res.status(404).json('file not found');
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get related products
export const getRelatedProduts = async (req, res) => {
  const { productId } = req.params;

  try {
    const relatedProducts = await RelatedProduct.find({ productId: productId });
    res.status(200).json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
