import { z } from 'zod';
import type {
  CategorySchema,
  ConditionSchema,
  CurrencySchema,
  ProductImageSchema,
  ProductSchema,
  ProductTagScheam,
  TagSchema,
} from '../model';

export type Product = z.infer<typeof ProductSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductTag = z.infer<typeof ProductTagScheam>;
export type Category = z.infer<typeof CategorySchema>;
export type Condition = z.infer<typeof ConditionSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
