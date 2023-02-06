import Cart from '../models/Cart.js';

// create cart
export const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const cart = await newCart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user cart
export const getCart = async (req, res) => {
  const id = req.params.id;
  try {
    const userCart = await Cart.findOne({ userId: id });
    if (!userCart) {
      res.status(404).json('Not Found');
      return;
    }
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// upadte cart
export const updateCart = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $set: { userId: req.body.userId, products: req.body.products } },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
