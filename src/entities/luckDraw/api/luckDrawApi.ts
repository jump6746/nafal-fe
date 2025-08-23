import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';
import type { LuckDrawList } from '../type/types';

export const getLuckDrawListAPI = async (
  auctionId: string
): Promise<ResponseDTO<LuckDrawList[]>> => {
  return await apiRequest<undefined, LuckDrawList[]>({
    url: `https://api.nafal.site/api/luckdraws?eventId=${auctionId}`,
    method: 'GET',
    skipAuth: false,
  });
};
