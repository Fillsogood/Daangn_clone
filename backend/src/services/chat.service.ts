import prisma from '../config/prisma';

export const createChatRoom = async (buyerId: number, postId: number) => {
  // 1. 게시글 가져오기
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { userId: true }, // sellerId
  });

  if (!post) throw new Error('게시글이 존재하지 않습니다.');
  const sellerId = post.userId;

  // 2. 이미 있는 채팅방인지 확인
  const existingRoom = await prisma.chatRoom.findFirst({
    where: {
      buyerId,
      sellerId,
      postId,
    },
  });

  if (existingRoom) return existingRoom;

  // 3. 없으면 새로 생성
  return await prisma.chatRoom.create({
    data: {
      buyerId,
      sellerId,
      postId,
    },
  });
};
