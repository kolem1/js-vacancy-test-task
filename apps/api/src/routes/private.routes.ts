import mount from 'koa-mount';
import compose from 'koa-compose';

import { AppKoa } from 'types';

import { accountRoutes } from 'resources/account';
import { productRoutes } from 'resources/product';
import { cartRoutes } from 'resources/cart';

import auth from './middlewares/auth.middleware';
import { checkoutRoutes } from 'resources/checkout';

export default (app: AppKoa) => {
  app.use(mount('/account', compose([auth, accountRoutes.privateRoutes])));
  app.use(mount('/products', compose([auth, productRoutes.privateRoutes])));
  app.use(mount('/cart', compose([auth, cartRoutes.privateRoutes])));
  app.use(mount('/checkout', compose([auth, checkoutRoutes.privateRoutes])));
};
