import type { ErrorResponse, ResponseDTO } from '@/shared/types';
import type { ImageFile, S3PresignedResponse, S3UploadResponse } from '../type';
import uploadToS3API from './uploadToS3API';
import { isSuccessResponse } from '@/shared/lib';

const uploadAllToS3 = async (
  files: ImageFile[],
  presigned: (ResponseDTO<S3PresignedResponse> | ErrorResponse)[]
): Promise<S3UploadResponse[]> => {
  if (files.length !== presigned.length) {
    throw new Error('파일 개수와 url 개수가 일치하지 않습니다.');
  }

  const uploadPromises = files.map(async (file, index) => {
    const presign = presigned[index];

    try {
      if (isSuccessResponse(presign)) {
        return await uploadToS3API(file, presign.data);
      } else {
        throw Error(presign.message);
      }
    } catch (error) {
      console.error(`파일 업로드 실패 = ${file.name}: `, error);

      const errorData: S3UploadResponse = {
        success: false,
        fileName: file.name,
        key: '',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };

      return errorData;
    }
  });

  return await Promise.all(uploadPromises);
};

export default uploadAllToS3;
