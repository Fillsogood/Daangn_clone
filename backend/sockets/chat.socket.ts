import { Server, Socket } from 'socket.io';
import prisma from '../src/config/prisma';

export const registerChatSocket = (io: Server, socket: Socket) => {
  // 채팅방 입장
  socket.on('chat:join', (roomId: string) => {
    socket.join(roomId);
  });

  // 메시지 전송
  socket.on('chat:send', async (data: { roomId: number; senderId: number; content: string }) => {
    const { roomId, senderId, content } = data;

    // 1. 유효성 검사
    const room = await prisma.chatRoom.findUnique({
      where: { id: roomId },
    });

    if (!room || (room.buyerId !== senderId && room.sellerId !== senderId)) {
      socket.emit('chat:error', { error: '채팅방 참여자가 아닙니다.' });
      return;
    }

    // 2. 메시지 저장 + sender 정보도 함께 조회
    const message = await prisma.chatMessage.create({
      data: { content, senderId, roomId },
      include: {
        sender: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    // 3. 메시지 전송
    io.to(String(roomId)).emit('chat:receive', {
      id: message.id,
      roomId,
      content: message.content,
      createdAt: message.createdAt,
      sender: {
        id: message.sender.id,
        nickname: message.sender.nickname,
      },
    });
  });
};
