import type { ResponseDTO } from '@/shared/types';
import type { CreateAuctionRequest } from '../type';
import { apiRequest } from '@/shared/lib';

const createAuctionApi = async (
  data: CreateAuctionRequest
): Promise<ResponseDTO<{ newEventId: number; newAuctionId: number }>> => {
  return await apiRequest<CreateAuctionRequest, { newEventId: number; newAuctionId: number }>({
    url: 'https://api.nafal.site/api/admin/auctions',
    method: 'POST',
    data,
  });
};

export default createAuctionApi;
