import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';
import type { GetUserResponse } from '../type';

const getUserApi = async (): Promise<ResponseDTO<GetUserResponse>> => {
  return await apiRequest<undefined, GetUserResponse>({
    url: 'https://api.nafal.site/api/users/me',
    method: 'GET',
  });
};

export default getUserApi;
