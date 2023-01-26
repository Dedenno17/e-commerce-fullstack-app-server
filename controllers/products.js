import Product from '../models/Product.js';

// get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
