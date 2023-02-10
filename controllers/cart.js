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
      res.status(201).json(null);
      return;
    }
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// upadte cart
export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });

    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    const { products, totalPrice } = req.body;

    cart.products = products;
    cart.totalPrice = totalPrice;

    await cart.save();

    return res.send({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
