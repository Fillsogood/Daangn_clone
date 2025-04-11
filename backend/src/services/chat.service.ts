import prisma from '../config/prisma';

export const createChatRoom = async (buyerId: number, postId: number) => {
  // 1. 게시글 가져오기
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { userId: true }, // sellerId
  });

  if (!post) throw new Error('게시글이 존재하지 않습니다.');
  const sellerId = post.userId;

  if (sellerId === buyerId) {
    throw new Error('자신의 게시글에는 채팅할 수 없습니다.');
  }

  // 2. 이미 있는 채팅방인지 확인
  const existingRoom = await prisma.chatRoom.findFirst({
    where: {
      buyerId,
      sellerId,
      postId,
      isDeleted: false, // soft delete 무시
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

export const getMessagesByRoom = async (roomId: number) => {
  return await prisma.chatMessage.findMany({
    where: { roomId },
    orderBy: { createdAt: 'asc' },
    include: {
      sender: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
};

export const sendMessage = async (roomId: number, senderId: number, content: string) => {
  // 채팅방 참여자 검증
  const room = await prisma.chatRoom.findUnique({ where: { id: roomId } });

  if (!room || (room.buyerId !== senderId && room.sellerId !== senderId)) {
    throw new Error('채팅방 참여자가 아닙니다.');
  }

  return await prisma.chatMessage.create({
    data: { roomId, senderId, content },
    include: {
      sender: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
};

export const getMyChatRooms = async (userId: number) => {
  return await prisma.chatRoom.findMany({
    where: {
      isDeleted: false,
      OR: [{ buyerId: userId }, { sellerId: userId }],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          price: true,
        },
      },
      buyer: {
        select: {
          id: true,
          nickname: true,
        },
      },
      seller: {
        select: {
          id: true,
          nickname: true,
        },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
        select: {
          content: true,
          createdAt: true,
        },
      },
    },
  });
};

export const deleteChatRoom = async (roomId: number) => {
  return await prisma.chatRoom.update({
    where: { id: roomId },
    data: { isDeleted: true },
  });
};