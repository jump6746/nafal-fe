import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';

export const updateIdentityVerifiedAPI = async (
  value: 'true' | 'false'
): Promise<ResponseDTO<void>> => {
  return await apiRequest<{ value: 'true' | 'false' }, void>({
    url: `https://api.nafal.site/api/users/me/identity-verified`,
    method: 'PUT',
    skipAuth: false,
    data: {
      value: value,
    },
  });
};

export const updateCardRegisteredAPI = async (value: 'true'): Promise<ResponseDTO<void>> => {
  return await apiRequest<{ value: 'true' }, void>({
    url: `https://api.nafal.site/api/users/me/card-registered`,
    method: 'PUT',
    skipAuth: false,
    data: {
      value: value,
    },
  });
};
