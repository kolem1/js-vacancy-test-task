import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';

import { validateMiddleware } from 'middlewares';
import { cartProductService } from 'resources/cart-product';
import { productService } from 'resources/product';

const schema = z.object({
  quantity: z.number().min(1),
});

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const cartProduct = await cartProductService.findOne({ _id: ctx.request.params.id });

  ctx.assertError(cartProduct, 'Product not found');

  const product = await productService.findOne({ _id: cartProduct.productId });
  const { quantity } = ctx.validatedData;

  ctx.assertError(quantity <= (product?.availableCount ?? 0), 'Available limit is exceeded');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { quantity } = ctx.validatedData;

  const updatedProduct = await cartProductService.updateOne(
    { _id: ctx.request.params?.id },
    () => ({ quantity }),
  );

  ctx.body = updatedProduct;
}

export default (router: AppRouter) => {
  router.put('/:id',  validateMiddleware(schema), validator, handler);
};
