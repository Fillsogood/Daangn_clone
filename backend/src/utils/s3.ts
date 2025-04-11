// src/utils/s3.ts
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const deleteFromS3 = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: 'daangn-clone-images',
    Key: key,
  });
  await s3.send(command);
};
