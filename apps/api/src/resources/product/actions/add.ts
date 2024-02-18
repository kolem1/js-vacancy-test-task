import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

const schema = z.object({
  title: z.string(),
  price: z.number(),
  image: z.any(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    title, price, image,
  } = ctx.validatedData;



  ctx.body = {
    title, price, image,
  } ;
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
