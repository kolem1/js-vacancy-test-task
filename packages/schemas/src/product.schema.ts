import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({
  title: z.string(),
  price: z.number(),
  imageUrl: z.string().optional(),
  ownerId: z.string(),
}).strict();
