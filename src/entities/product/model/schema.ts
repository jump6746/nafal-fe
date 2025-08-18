import Decimal from 'decimal.js';
import { z } from 'zod';

const Decimal10_2Schema = z
  .union([
    z.string().regex(/^-?\d{1,7}(\.\d{1,2})?$/, '최대 7자리 정수, 소수점 2자리까지'),
    z.number(),
  ])
  .transform(val => {
    const decimal = new Decimal(val);
    return decimal.toDecimalPlaces(2); // 소수점 3자리로 제한
  });

export const ProductSchema = z.object({
  product_id: z.number().int().positive(),
  category_id: z.number().int().positive(), // small int
  condition_id: z.number().int().positive(), // small int
  title: z.string().max(255),
  product_name: z.string().max(255),
  material: z.string().max(255),
  usage_location: z.string().max(255),
  width_cm: Decimal10_2Schema,
  height_cm: Decimal10_2Schema,
  tolerance_cm: Decimal10_2Schema,
  edition_info: z.string().max(255),
  history_body: z.string(), // text
  detail_info: z.string(), // text
  created_at: z.date(),
});

export const ProductImageSchema = z.object({
  image_id: z.number().int().positive(),
  product_id: z.number().int().positive(),
  url: z.string().max(500),
  type: z.enum(['THUMBNAIL', 'GALLERY']),
  source: z.string().max(255),
  sort_order: z.number().int().positive(), // small int
});

export const CategorySchema = z.object({
  category_id: z.number().int().positive(),
  name: z.string().max(255),
});

export const ConditionSchema = z.object({
  condition_id: z.number().int().positive(), // small int
  label: z.string().max(100),
});

export const ProductTagScheam = z.object({
  product_id: z.number().int().positive(),
  tag_id: z.number().int().positive(), // small int
});

export const TagSchema = z.object({
  tag_id: z.number().int().positive(), // small int
  name: z.string().max(20),
});

export const CurrencySchema = z.object({
  code: z.string().max(10),
  symbol: z.string().max(5),
});
