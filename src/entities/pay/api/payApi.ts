import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';
import type { Card } from '../type/type';

export const getCardsAPI = async (): Promise<ResponseDTO<Card[]>> => {
  return await apiRequest<undefined, Card[]>({
    url: `https://api.nafal.site/api/cards`,
    method: 'GET',
    skipAuth: false,
  });
};

export const registerCardAPI = async (
  pan: string,
  expMonth: number,
  expYear: number,
  holderName: string
): Promise<ResponseDTO<void>> => {
  return await apiRequest<
    { pan: string; expMonth: number; expYear: number; holderName: string },
    void
  >({
    url: `https://api.nafal.site/api/cards`,
    method: 'POST',
    skipAuth: false,
    data: {
      pan,
      expMonth,
      expYear,
      holderName,
    },
  });
};
