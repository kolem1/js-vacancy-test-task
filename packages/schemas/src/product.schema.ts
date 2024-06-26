import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({
  title: z.string(),
  price: z.number(),
  imageUrl: z.string().optional(),
  ownerId: z.string(),
  availableCount: z.number().default(0),
  isSold: z.boolean().default(false),
}).strict();
