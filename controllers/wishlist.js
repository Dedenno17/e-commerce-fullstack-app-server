import Wishlist from '../models/Wishlist.js';

// create wishlist
export const createWishlist = async (req, res) => {
  const newWishlist = new Wishlist(req.body);

  try {
    const savedWishlist = await newWishlist.save();
    res.status(200).json(savedWishlist);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

// get wishlist
export const getWishlist = async (req, res) => {
  const { id } = req.params;

  try {
    const wishlist = await Wishlist.find({ userId: id });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

// update wishlist
export const updateWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ userId: id });

    if (!wishlist) {
      return res.status(404).send({ error: 'Wishlist not found' });
    }

    const { products, totalPrice } = req.body;

    wishlist.products = products;
    wishlist.totalPrice = totalPrice;

    await wishlist.save();

    return res.send({
      success: true,
      message: 'Wishlist updated successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // update wishlist
// export const removeWishlist = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const newWishlist = await Wishlist.find({ userId: id });

//     if (!newWishlist) {
//       return res.status(404).send({ error: 'Cart not found' });
//     }

//     const { idWishlistProduct } = req.body;
//     newWishlist.products.filter((item) => item._id !== idWishlistProduct);

//     await newWishlist.save();
//     res.status(201).json({ message: 'remove wishlist successfuly!' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
