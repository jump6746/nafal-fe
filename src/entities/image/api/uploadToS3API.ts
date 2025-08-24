import type { ImageFile, S3PresignedResponse, S3UploadResponse } from '../type';

const uploadToS3API = async (
  image: ImageFile,
  presigned: S3PresignedResponse
): Promise<S3UploadResponse> => {
  const response = await fetch(presigned.presignedUrl, {
    method: 'PUT',
    body: image.file,
    headers: {
      'Content-Type': 'image/webp',
    },
  });

  if (!response.ok) {
    throw new Error(`S3 upload failed: ${response.status} ${response.statusText}`);
  }

  return {
    success: true,
    fileName: image.name,
    key: presigned.s3Key,
  };
};

export default uploadToS3API;
