import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';

import { validateMiddleware } from 'middlewares';
import multer from '@koa/multer';
import { Next, Request } from 'koa';
import { firebaseService } from 'services';
import { productService } from 'resources/product';
import { validationUtil } from 'utils';

const upload = multer();

const schema = z.object({
  title: z.string().min(1, 'Please enter the title').max(100),
  price: validationUtil.requiredNumberFromString('Price'),
  availableCount: validationUtil.requiredNumberFromString('Available Amount'),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const { file } = ctx.request;
  
  ctx.assertClientError(file, { image: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { title, price, availableCount } = ctx.validatedData;
  const { file } = ctx.request;
  const { user } = ctx.state;

  const fileName = `images/${user._id}-${Date.now()}-${file.originalname}`;
  const imageUrl = await firebaseService.upload(fileName, file);

  const product = await productService.insertOne({
    title,
    price,
    ownerId: user._id,
    imageUrl,
    availableCount,
  });

  ctx.body = {
    product,
  };
}

export default (router: AppRouter) => {
  router.post('/', upload.single('image'), validator, validateMiddleware(schema), handler);
};
