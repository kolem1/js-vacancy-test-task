import { AppKoaContext, AppRouter } from 'types';

import { cartWorkflow } from 'workflows';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const results = await cartWorkflow.getFullCartProducts(user._id);

  ctx.body = {
    results,
    totalBill: results.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
  };
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
