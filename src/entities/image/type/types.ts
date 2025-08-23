export interface ImageFile {
  id: number;
  file: File;
  preview: string;
  name: string;
}

export interface S3PresignedResponse {
  presignedUrl: string;
  s3Key: string;
}

export interface S3UploadResponse {
  success: boolean;
  fileName: string;
  key: string;
  error?: string;
}
