import config from 'config';
import Stripe from 'stripe';
import { AppKoaContext, AppRouter, CartProduct, Next } from 'types';

import { stripeService } from 'services';
import { cartProductService } from 'resources/cart-product';
import { productService } from 'resources/product';


interface ValidatedData {
  event: Stripe.Event;
}

async function validator(ctx: AppKoaContext, next: Next) {
  const signature = ctx.request.header['stripe-signature'];

  ctx.assertError(signature, 'Stripe signature header is missing');

  try {
    const event = stripeService.webhooks.constructEvent(ctx.request.rawBody, signature, config.STRIPE_WEBHOOK_SECRET);

    ctx.validatedData = {
      event,
    };
  } catch (err: any) {
    ctx.throwError(`Webhook Error: ${err.message}`);
  }

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { event } = ctx.validatedData;

  switch (event.type) {
    case 'checkout.session.completed':
      const jsonProducts = event.data.object.metadata?.products ?? '[]';

      const cartProductsIds = JSON.parse(jsonProducts);
      
      ctx.assertError(Array.isArray(cartProductsIds) 
        && cartProductsIds.length > 0, 'Products ids are not provided');

      ctx.assertError(cartProductsIds.every((id: unknown): id is string => typeof id === 'string'), 'Products ids are not strings');
      
      const products = await cartProductService.updateMany(
        { _id: { $in: cartProductsIds }, isActive: true }, 
        () => ({ isActive: false, soldDate: new Date() }),
      );

      const productsIds: string[] = [];
      const productsMap = products.reduce((acc, product) => {
        acc.set(product.productId, product);
        productsIds.push(product.productId);
        return acc;
      }, new Map<string, CartProduct>());

      await productService.updateMany({ _id: { $in: productsIds } }, ({ _id, availableCount }) => {
        const product = productsMap.get(_id);

        ctx.assertError(product, 'Product is not found');

        const newAvailableCount = availableCount - product.quantity;
        const isNotSoldOut = newAvailableCount > 0;

        return {
          availableCount: newAvailableCount,
          isSold: !isNotSoldOut,
        };
      });

  }

  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.post('/stripe', validator, handler);
};