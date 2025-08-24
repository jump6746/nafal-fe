import { apiRequest } from '@/shared/lib';
import type { ResponseDTO } from '@/shared/types';
import type { ImageFile, S3PresignedResponse } from '../type';

interface Props {
  imageFile: ImageFile;
}

const getPresignedUrlAPI = async ({
  imageFile,
}: Props): Promise<ResponseDTO<S3PresignedResponse>> => {
  return await apiRequest({
    url: `https://api.nafal.site/api/s3/upload-url?uploadType=TEMP&fileName=${imageFile.name}&contentType=image/webp`,
    method: 'GET',
  });
};

export default getPresignedUrlAPI;
