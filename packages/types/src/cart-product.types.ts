import { z } from 'zod';

import { cartProductSchema } from 'schemas';

export type CartProduct = z.infer<typeof cartProductSchema>;

export interface CartProductDto {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  available: number,
}

export interface CartHistoryProduct {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  soldDate: string;
}
