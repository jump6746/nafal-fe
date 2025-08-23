import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';
import type { LoginRequest, LoginResponse } from '../type';

const loginApi = async (data: LoginRequest): Promise<ResponseDTO<LoginResponse>> => {
  return await apiRequest<LoginRequest, LoginResponse>({
    url: 'https://api.nafal.site/api/auth/login',
    method: 'POST',
    credentials: 'include',
    data,
  });
};

export default loginApi;
