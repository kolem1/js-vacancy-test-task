import { AppKoaContext, AppRouter } from 'types';

import { cartProductService } from 'resources/cart-product';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const count = await cartProductService.countDocuments({
    ownerId: user._id,
    isActive: true,
  });

  ctx.body = {
    count,
  };
}

export default (router: AppRouter) => {
  router.get('/count', handler);
};
