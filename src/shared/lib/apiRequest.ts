import type { APIErrorResponse, ErrorResponse, ResponseDTO } from '../types';

interface FetchProps<T, H extends Record<string, string>> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  credentials?: RequestCredentials;
  data?: T;
  headers?: H;
  skipAuth?: boolean;
  baseURL?: string;
}

// T = 바디에 넣을 데이터, P = Response 형식, H = 헤더에 추가로 넣을 데이터 타입

const apiRequest = async <
  T = undefined,
  P = unknown,
  H extends Record<string, string> = Record<string, never>,
>({
  url,
  method,
  data,
  credentials,
  headers,
  skipAuth = false,
}: FetchProps<T, H>): Promise<ResponseDTO<P>> => {
  const body = data ? JSON.stringify(data) : null;

  const getAccessToken = () => {
    const accessToken = sessionStorage.getItem('nefal-access');
    return accessToken || null;
  };

  const performRequest = async (retryCount = 0): Promise<ResponseDTO<P>> => {
    console.log(`API 요청: ${url} ${method}`);
    try {
      const accessToken = getAccessToken();

      const defaultHeaders: Record<string, string> = {
        ...(method !== 'GET' && { 'Content-Type': 'application/json' }),
        ...(accessToken && !skipAuth && { Authorization: `Bearer ${accessToken}` }),
      };

      const mergedHeaders = { ...defaultHeaders, ...headers };

      const response = await fetch(url, {
        method,
        headers: mergedHeaders,
        credentials,
        body,
      });

      if (!response.ok) {
        const responseData: ErrorResponse = await response.json();

        if (responseData.status == 401 && retryCount == 0) {
          // Refresh 로직 필요
        }

        throw responseData;
      }

      const responseData: ResponseDTO<P> = await response.json();

      return responseData;
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        throw error;
      }

      const networkError = new Error('예기치 못한 에러가 발생했습니다.') as APIErrorResponse;
      networkError.status = 500;
      networkError.name = 'Network Error';
      networkError.timestamp = new Date().toISOString();

      throw networkError;
    }
  };

  return await performRequest();
};

export default apiRequest;
