import { apiRequest } from '@/shared/lib';
import type { AuctionListItem } from '@/entities/auction/type/types';
import type { ResponseDTO } from '@/shared/types';

export const getAuctionListAPI = async (param: {
  status: 'OPEN' | 'CLOSED' | 'SCHEDULED';
  view?: 'DEFAULT' | 'NEW' | 'POPULAR' | 'OPENING_SOON';
  keyword?: string;
  page?: number;
  size?: number;
}): Promise<ResponseDTO<AuctionListItem[]>> => {
  const page = param.page ?? 0;
  const size = param.size ?? 10;

  const queryParams = [`status=${param.status}`, `page=${page}`, `size=${size}`];

  // 선택적 파라미터들 - 값이 있을 때만 추가
  if (param.view) {
    queryParams.push(`view=${param.view}`);
  }
  if (param.keyword) {
    queryParams.push(`keyword=${encodeURIComponent(param.keyword)}`);
  }

  return await apiRequest<undefined, AuctionListItem[]>({
    url: `https://api.nafal.site/auctions?${queryParams.join('&')}`,
    method: 'GET',
    skipAuth: true,
  });
};
