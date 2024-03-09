import { eventBus, InMemoryEvent } from '@paralect/node-mongo';

import { Product } from 'types';
import { DATABASE_DOCUMENTS } from 'app-constants';

import logger from 'logger';
import { cartProductService } from 'resources/cart-product';

const { PRODUCTS } = DATABASE_DOCUMENTS;

eventBus.on(`${PRODUCTS}.deleted`, async (data: InMemoryEvent<Product>) => {
  try {
    const product = data.doc;

    await cartProductService.deleteMany({ productId: product._id });
  } catch (err) {
    logger.error(`${PRODUCTS}.updated handler error: ${err}`);
  }
});

