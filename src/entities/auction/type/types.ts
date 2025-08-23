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
  userId: string;
  sellerName: string;
  productName: string;
  productImageUrl: string;
  currentPrice: number;
  immediatelyPurchasePrice: number;
  bidCnt: number;
  startAt: string;
  endAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface ImageInfo {
  presignedUrl: string;
  s3Key: string;
}

export interface EventInfo {
  eventName: string;
  eventDescription: string;
}

export interface ProductDetail {
  productName: string;
  thumbnailImageUrl: ImageInfo;
  originalImageUrl: ImageInfo;
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
  auctionId: number;
  productId: number;
  userId: number;
  status: 'OPEN' | 'CLOSED' | 'SCHEDULED';
  sellerName: string;
  shortLogo: ImageInfo;
  longLogo: ImageInfo;
  categories: Category[];
  currentPrice: number;
  bidUnit: number;
  participantCount: number;
  ticketCount: number;
  event: EventInfo;
  product: ProductDetail;
  delivery: unknown;
  story: string;
  storyImageUrl: ImageInfo | null;
  startAt: string;
  endAt: string;
  createdAt: string;
}
