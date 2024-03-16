import Stripe from 'stripe';
import config from 'config';
import { CartProductDto } from 'types';

const stripe = new Stripe(config.STRIPE_KEY, { typescript: true });

async function createCheckoutSession(userId:string, products: CartProductDto[]) {
  const session = await stripe.checkout.sessions.create({
    line_items: products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          images: product.imageUrl != null ? [product.imageUrl] : undefined,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    })),
    mode: 'payment',
    metadata: {
      userId,
      products: JSON.stringify(products.map(({ id }) => id)),
    },
    success_url: `${config.WEB_URL}/cart/payment-success`,
    cancel_url: `${config.WEB_URL}/cart/payment-cancel`,
  });

  return session;
}

export default {
  ...stripe,
  createCheckoutSession,
};