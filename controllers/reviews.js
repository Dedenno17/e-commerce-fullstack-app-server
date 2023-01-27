import Reviews from '../models/Reviews.js';

// get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single reviews
export const getSingleReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const review = await Reviews.find({ productId: productId });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create Reviews
export const createReviews = async (req, res) => {
  const newReviews = new Reviews(req.body);

  try {
    const reviews = await newReviews.save();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update reviews
export const updateReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReviews = await Reviews.findByIdAndUpdate(id, {
      $set: {
        productId: req.body.productId,
        reviews: req.body.reviews,
      },
    });

    res.status(200).json(updatedReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
