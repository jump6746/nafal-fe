import { apiRequest } from '@/shared/lib';
import type {
  AuctionListItem,
  AuctionDetail,
  PageResponse,
  BrandItem,
  EventItem,
} from '@/entities/auction/type/types';
import type { ResponseDTO } from '@/shared/types';

export const getAuctionListAPI = async (param: {
  status: 'OPEN' | 'CLOSED' | 'SCHEDULED';
  view?: 'DEFAULT' | 'NEW' | 'POPULAR' | 'OPENING_SOON';
  keyword?: string;
  page?: number;
  size?: number;
  categorys?: string[];
  maxCurrentPrice?: number;
  minCurrentPrice?: number;
  brand?: string[];
  eventName?: string[];
}): Promise<ResponseDTO<PageResponse<AuctionListItem>>> => {
  const page = param.page ?? 0;
  const size = param.size ?? 20;

  const queryParams = [`status=${param.status}`, `page=${page}`, `size=${size}`];

  if (param.view) queryParams.push(`view=${param.view}`);
  if (param.keyword) queryParams.push(`keyword=${encodeURIComponent(param.keyword)}`);
  if (param.categorys && param.categorys.length > 0)
    queryParams.push(`categorys=${param.categorys.join(',')}`);
  if (param.maxCurrentPrice) queryParams.push(`maxCurrentPrice=${param.maxCurrentPrice}`);
  if (param.minCurrentPrice) queryParams.push(`minCurrentPrice=${param.minCurrentPrice}`);
  if (param.brand && param.brand.length > 0) queryParams.push(`brand=${param.brand.join(',')}`);
  if (param.eventName && param.eventName.length > 0)
    queryParams.push(`eventName=${param.eventName.join(',')}`);

  return await apiRequest<undefined, PageResponse<AuctionListItem>>({
    url: `https://api.nafal.site/api/auctions?${queryParams.join('&')}`,
    method: 'GET',
    skipAuth: true,
  });
};

export const getAuctionDetailAPI = async (
  auctionId: string
): Promise<ResponseDTO<AuctionDetail>> => {
  return await apiRequest<undefined, AuctionDetail>({
    url: `https://api.nafal.site/api/auctions/${auctionId}`,
    method: 'GET',
    skipAuth: true,
  });
};

export const getBrandListAPI = async (): Promise<ResponseDTO<BrandItem[]>> => {
  return await apiRequest<undefined, BrandItem[]>({
    url: 'https://api.nafal.site/api/users/sellers',
    method: 'GET',
    skipAuth: true,
  });
};

export const getEventListAPI = async (): Promise<ResponseDTO<EventItem[]>> => {
  return await apiRequest<undefined, EventItem[]>({
    url: 'https://api.nafal.site/api/events',
    method: 'GET',
    skipAuth: true,
  });
};
