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
  auctionId: z.number().int().positive(),
  productId: z.number().int().positive(),
  userId: z.number().int().positive(),
  currencyCode: z.string().max(10), // varchar 10
  eventId: z.number().int().positive(),
  startPrice: z.number().int().positive(),
  bidIncrement: z.number().int().positive(),
  immediatelyPurchasePrice: z.number().int().positive(),
  startAt: z.date(),
  endAt: z.date(),
  status: z.enum(['SCHEDULED', 'OPEN', 'CLOSED', 'CANCELED']),
  expectedEffectCo2Kg: Decimal10_3Schema, // decimal(10, 3)
  expectedEffectDesc: z.string(),
  createdAt: z.date(),
});

export const EventSchema = z.object({
  eventId: z.number().int().positive(),
  name: z.string().max(255),
  description: z.string(),
  createdAt: z.date(),
});

export const BidSchema = z.object({
  bidId: z.number().int().positive(),
  auctionId: z.number().int().positive(),
  userId: z.number().int().positive(),
  amount: z.number().int().positive(),
  placedAt: z.date(),
});

export const WinnerSchema = z.object({
  userId: z.number().int().positive(),
  auctionId: z.number().int().positive(),
  deliveryId: z.number().int().positive(), // small int
});

export const DeliveryMethodSchema = z.object({
  deliveryId: z.number().int().positive(), // small int
  code: z.enum(['PICKUP', 'STANDARD', 'FREIGHT']),
  label: z.string().max(100), // varchar 100
});
