// src/utils/uploadToS3.ts
export const uploadToS3 = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const uploadUrl = `https://daangn-clone-images.s3.ap-northeast-2.amazonaws.com/images/${fileName}`;

  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error('이미지 업로드 실패');
  }

  // 업로드된 파일의 실제 접근 URL을 리턴
  return `https://daangn-clone-images.s3.ap-northeast-2.amazonaws.com/images/${fileName}`;
};
