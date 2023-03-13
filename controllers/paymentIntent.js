// const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SEC_KEY);

// create payment intent
export const createPaymentIntent = async (req, res) => {
  const { totalPrice } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
    // res.send('Success create payment intent');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
