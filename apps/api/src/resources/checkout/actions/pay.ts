import { stripeService } from 'services';
import { AppKoaContext, AppRouter } from 'types';
import { cartWorkflow } from 'workflows';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const products = await cartWorkflow.getFullCartProducts(user._id);

  ctx.assertClientError(products.length, { global:'Nothing to buy' });

  const session = await stripeService.createCheckoutSession(user._id, products);

  ctx.assertClientError(session.url, { global: 'Unable to retrieve session url' }, 503);

  ctx.body = {
    checkoutLink: session.url,
  }; 
}

export default (router: AppRouter) => {
  router.post('/',  handler);
};