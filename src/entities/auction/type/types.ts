import { z } from 'zod';
import type {
  AuctionSchema,
  BidSchema,
  DeliveryMethodSchema,
  EventSchema,
  WinnerSchema,
} from '../model';

export type Auction = z.infer<typeof AuctionSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Bid = z.infer<typeof BidSchema>;
export type Winner = z.infer<typeof WinnerSchema>;
export type DeliveryMethod = z.infer<typeof DeliveryMethodSchema>;

export interface AuctionList {
  auctionId: number;
  productId: number;
  userId: number;
  sellerName: string;
  productName: string;
  currentPrice: string;
  currencyCode: string;
  bidCnt: number;
  eventId: number;
  startPrice: number;
  bidIncrement: number;
  immediatelyPurchasePrice: number;
  startAt: string;
  endAt: string;
  imgUrl: string;
}
