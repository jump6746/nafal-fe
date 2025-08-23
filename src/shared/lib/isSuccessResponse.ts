import type { ErrorResponse, ResponseDTO } from '../types';

const isSuccessResponse = <T>(
  response: ResponseDTO<T> | ErrorResponse
): response is ResponseDTO<T> => {
  return response && 'data' in response && response.data !== undefined;
};

export default isSuccessResponse;
