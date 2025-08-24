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

export interface AuctionListItem {
  auctionId: string;
  productId: string;
  userId: number;
  sellerName: string;
  productName: string;
  currentPrice: number;
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

export interface Category {
  categoryId: number;
  name: string;
}

export interface Tag {
  tagId: number;
  name: string;
}

export interface EventInfo {
  eventName: string;
  eventDescription: string;
}

export interface ProductDetail {
  productName: string;
  imageUrl: string;
  imageType: string;
  productDescription: string;
  tags: Tag[];
  widthCm: number;
  heightCm: number;
  material: string;
  usageLocation: string;
  editionInfo: string;
  condition: string;
}

export interface AuctionDetail {
  auctionId: string;
  productId: string;
  userId: string;
  status: 'OPEN' | 'CLOSED' | 'SCHEDULED';
  sellerName: string;
  categories: Category[];
  currentPrice: number;
  bidUnit: number;
  participantCount: number;
  event: EventInfo;
  product: ProductDetail;
  delivery: null | string; // 배송 정보가 없는 경우가 있으므로 null 허용
  startAt: string;
  endAt: string;
  createdAt: string;
}

export interface AuctionDetailResponse {
  status: number;
  message: string;
  data: AuctionDetail;
  timestamp: string;
}
