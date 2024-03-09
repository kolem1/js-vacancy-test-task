import { z } from 'zod';

import dbSchema from './db.schema';

export const cartProductSchema = dbSchema.extend({
  ownerId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  isActive: z.boolean(),
}).strict();
