import { z } from 'zod';
import type {
  AuctionSchema,
  BidSchema,
  DeliveryMethodSchema,
  EventSchema,
  WinnerSchema,
} from '../model';
import type { ImageFile } from '@/entities/image/type';

export type Auction = z.infer<typeof AuctionSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Bid = z.infer<typeof BidSchema>;
export type Winner = z.infer<typeof WinnerSchema>;
export type DeliveryMethod = z.infer<typeof DeliveryMethodSchema>;

export interface AuctionListItem {
  auctionId: string;
  eventId: string;
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
  tags: string[];
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
  categories: string[];
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

export interface AuctionDetailResponse {
  status: number;
  message: string;
  data: AuctionDetail;
  timestamp: string;
}

// 제품 핵심 정보
interface ProductCoreInfo {
  title: string;
  condition: string;
  categories: string[];
  expectedEffect: string;
  imageKeys: string[];
}

// 제품 속성
interface ProductAttributes {
  detailInfo: string;
  tags: string[];
  width: number;
  height: number;
}

// 제품 추가 정보
interface ProductAdditionalInfo {
  material: string;
  usageLocation: string;
  editionInfo: string;
}

// 스토리 상세
interface StoryDetails {
  content: string;
  imageKey: string;
}

// 경매 설정
interface AuctionSettings {
  startPrice: number;
  bidIncrement: number;
  immediatelyPurchasePrice: number;
  startAt: Date;
  endAt: Date;
}

// 이벤트 상세
interface EventDetails {
  name: string;
  description: string;
}

// 배송 상세
interface DeliveryDetails {
  method: string;
  cost: number;
  note: string;
}

// 메인 제품 인터페이스
export interface CreateAuctionRequest {
  productCoreInfo: ProductCoreInfo;
  productAttributes: ProductAttributes;
  productAdditionalInfo: ProductAdditionalInfo;
  storyDetails: StoryDetails;
  auctionSettings: AuctionSettings;
  eventDetails: EventDetails;
  deliveryDetails: DeliveryDetails;
}

export interface CreateAuctionStep {
  productCoreInfo: {
    title: string;
    condition: string;
    categories: string[];
    expectedEffect: string;
    imageFiles: ImageFile[];
  };
  productAttributes: {
    detailInfo: string;
    tags: string[];
    width: number;
    height: number;
  };
  productAdditionalInfo: {
    material: string;
    usageLocation: string;
    editionInfo: string;
  };
  storyDetails: {
    content: string;
    imageFile: ImageFile;
  };
  auctionSettings: {
    startPrice: number;
    bidIncrement: number;
    immediatelyPurchasePrice: number;
    startAt: Date;
    endAt: Date;
  };
  eventDetails: {
    name: string;
    description: string;
  };
  deliveryDetails: {
    method: string;
    cost: number;
    note: string;
  };
}

export interface GetBidHistoryResponse {
  content: {
    username: string;
    message: string;
    placedAt: string;
  }[];
  hasNext: boolean;
  nextCursor: string | null;
}
