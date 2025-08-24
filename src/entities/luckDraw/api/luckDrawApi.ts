import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';
import type { LuckDrawList } from '../type/types';

export const getLuckDrawListAPI = async (eventId: string): Promise<ResponseDTO<LuckDrawList[]>> => {
  return await apiRequest<undefined, LuckDrawList[]>({
    url: `https://api.nafal.site/api/draws/${eventId}`,
    method: 'GET',
    skipAuth: false,
  });
};
