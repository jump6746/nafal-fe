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
  productId: z.number().int().positive(),
  categoryId: z.number().int().positive(), // small int
  conditionId: z.number().int().positive(), // small int
  title: z.string().max(255),
  productName: z.string().max(255),
  material: z.string().max(255),
  usageLocation: z.string().max(255),
  widthCm: Decimal10_2Schema,
  heightCm: Decimal10_2Schema,
  toleranceCm: Decimal10_2Schema,
  editionInfo: z.string().max(255),
  historyBody: z.string(), // text
  detailInfo: z.string(), // text
  createdAt: z.date(),
});

export const ProductImageSchema = z.object({
  imageId: z.number().int().positive(),
  productId: z.number().int().positive(),
  url: z.string().max(500),
  type: z.enum(['THUMBNAIL', 'GALLERY']),
  source: z.string().max(255),
  sortOrder: z.number().int().positive(), // small int
});

export const CategorySchema = z.object({
  categoryId: z.number().int().positive(),
  name: z.string().max(255),
});

export const ConditionSchema = z.object({
  conditionId: z.number().int().positive(), // small int
  label: z.string().max(100),
});

export const ProductTagScheam = z.object({
  productId: z.number().int().positive(),
  tagId: z.number().int().positive(), // small int
});

export const TagSchema = z.object({
  tagId: z.number().int().positive(), // small int
  name: z.string().max(20),
});

export const CurrencySchema = z.object({
  code: z.string().max(10),
  symbol: z.string().max(5),
});
