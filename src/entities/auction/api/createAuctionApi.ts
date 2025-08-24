import type { ResponseDTO } from '@/shared/types';
import type { CreateAuctionRequest } from '../type';
import { apiRequest } from '@/shared/lib';

const createAuctionApi = async (
  data: CreateAuctionRequest
): Promise<ResponseDTO<{ newAuctionId: number }>> => {
  return await apiRequest<CreateAuctionRequest, { newAuctionId: number }>({
    url: 'https://api.nafal.site/api/admin/auctions',
    method: 'POST',
    data,
  });
};

export default createAuctionApi;
