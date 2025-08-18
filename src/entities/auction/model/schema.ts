import { z } from 'zod';
import { Decimal } from 'decimal.js';

const Decimal10_3Schema = z
  .union([
    z.string().regex(/^-?\d{1,7}(\.\d{1,3})?$/, '최대 7자리 정수, 소수점 3자리까지'),
    z.number(),
  ])
  .transform(val => {
    const decimal = new Decimal(val);
    return decimal.toDecimalPlaces(3); // 소수점 3자리로 제한
  });

export const AuctionSchema = z.object({
  auction_id: z.number().int().positive(),
  product_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  currency_code: z.string().max(10), // varchar 10
  event_id: z.number().int().positive(),
  start_price: z.number().int().positive(),
  bid_increment: z.number().int().positive(),
  immediately_purchase_price: z.number().int().positive(),
  start_at: z.date(),
  end_at: z.date(),
  status: z.enum(['SCHEDULED', 'OPEN', 'CLOSED', 'CANCELED']),
  expected_effect_co2_kg: Decimal10_3Schema, // decimal(10, 3)
  expected_effect_desc: z.string(),
  created_at: z.date(),
});

export const EventSchema = z.object({
  event_id: z.number().int().positive(),
  name: z.string().max(255),
  description: z.string(),
  created_at: z.date(),
});

export const BidSchema = z.object({
  bid_id: z.number().int().positive(),
  auction_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  amount: z.number().int().positive(),
  placed_at: z.date(),
});

export const WinnerSchema = z.object({
  user_id: z.number().int().positive(),
  auction_id: z.number().int().positive(),
  delivery_id: z.number().int().positive(), // small int
});

export const DeliveryMethodSchema = z.object({
  delivery_id: z.number().int().positive(), // small int
  code: z.enum(['PICKUP', 'STANDARD', 'FREIGHT']),
  label: z.string().max(100), // varchar 100
});
