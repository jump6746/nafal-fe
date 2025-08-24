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
