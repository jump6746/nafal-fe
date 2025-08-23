import { apiRequest } from '@/shared/lib';
import type { ErrorResponse, ResponseDTO } from '@/shared/types';
import type { ImageFile } from '../type';

interface Props {
  imageFile: ImageFile;
}

const getPresignedUrlAPI = async ({
  imageFile,
}: Props): Promise<ResponseDTO<undefined> | ErrorResponse> => {
  return await apiRequest({
    url: '',
    method: 'GET',
    data: imageFile,
  });
};

export default getPresignedUrlAPI;
