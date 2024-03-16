import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';

import { validateMiddleware } from 'middlewares';
import { Next } from 'koa';
import { productService } from 'resources/product';
import { cartProductService } from 'resources/cart-product';

const schema = z.object({
  productId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;
  
  const product = await productService.findOne({ _id: productId });
  
  ctx.assertClientError(product, { global: 'Product is not found' }, 404);

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { productId } = ctx.validatedData;
  const { user } = ctx.state;

  let product = await cartProductService.findOne({ ownerId: user._id, productId, isActive: true });

  if (product) {
    product = await cartProductService.updateOne(
      {
        _id: product._id,
      },
      (doc) => {
        return {
          ...doc,
          quantity: doc.quantity + 1,
        };
      },
    );
  } else {
    product = await cartProductService.insertOne({
      productId,
      ownerId: user._id,
      quantity: 1,
      isActive: true,
    });
  }

  ctx.body = {
    product,
  };
}

export default (router: AppRouter) => {
  router.post('/',  validateMiddleware(schema), validator, handler);
};
