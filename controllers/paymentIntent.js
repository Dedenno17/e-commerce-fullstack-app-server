import Stripe from 'stripe';
import stripe from 'stripe';

// create payment intent
export const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1990,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });

  res.send({ clientSecret: paymentIntent.client_secret });
};
