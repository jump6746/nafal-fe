import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';
import type { GetBidHistoryResponse } from '../type';

const getBidHistoryApi = async ({
  auctionId,
  cursor,
  size = 10,
}: {
  auctionId: string;
  cursor?: string;
  size?: number;
}): Promise<ResponseDTO<GetBidHistoryResponse>> => {
  return await apiRequest<undefined, GetBidHistoryResponse>({
    url: `https://api.nafal.site/api/auctions/${auctionId}/bids?size=${size}${cursor ? `&cursor=${cursor}` : ''}`,
    method: 'GET',
  });
};

export default getBidHistoryApi;
