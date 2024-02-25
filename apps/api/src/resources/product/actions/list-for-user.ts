import { AppKoaContext, AppRouter } from 'types';
import { productService } from 'resources/product';


async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const products = await productService.find({ ownerId: user._id });


  ctx.body = products.results;
}

export default (router: AppRouter) => {
  router.get('/user',  handler);
};
