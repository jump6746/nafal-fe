import type { ResponseDTO } from '@/shared/types';
import type { SignupRequest, SignupResponse } from '../type';
import { apiRequest } from '@/shared/lib';

const signupApi = async (data: SignupRequest): Promise<ResponseDTO<SignupResponse>> => {
  return await apiRequest<SignupRequest, SignupResponse>({
    url: 'https://api.nafal.site/api/auth/signup',
    method: 'POST',
    data,
  });
};

export default signupApi;
