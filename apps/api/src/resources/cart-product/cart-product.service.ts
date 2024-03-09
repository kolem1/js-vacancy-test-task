import { CartProduct } from 'types';
import { cartProductSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';

const service = db.createService<CartProduct>(DATABASE_DOCUMENTS.CART_PRODUCTS, {
  schemaValidator: (obj) => cartProductSchema.parseAsync(obj),
});

export default service;
