import { AppKoaContext, AppRouter } from 'types';

import { cartWorkflow } from 'workflows';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const results = await cartWorkflow.getCartHistoryProducts(user._id);

  ctx.body = {
    results,
  };
}

export default (router: AppRouter) => {
  router.get('/history', handler);
};
