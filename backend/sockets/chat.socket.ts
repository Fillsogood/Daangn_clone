// sockets/chat.socket.ts
import { Server, Socket } from 'socket.io';
import prisma from '../src/config/prisma';

export const registerChatSocket = (io: Server, socket: Socket) => {
  // 채팅방 입장
  socket.on('chat:join', (roomId: string) => {
    socket.join(roomId);
    console.log(`✅ ${socket.id} joined room ${roomId}`);
  });

  // 메시지 전송
  socket.on('chat:send', async (data: { roomId: number; senderId: number; content: string }) => {
    const { roomId, senderId, content } = data;

    // DB 저장
    const message = await prisma.chatMessage.create({
      data: {
        content,
        senderId,
        roomId,
      },
    });

    // 메시지 실시간 전송
    io.to(String(roomId)).emit('chat:receive', {
      content: message.content,
      senderId: message.senderId,
      roomId: message.roomId,
      createdAt: message.createdAt,
    });
  });

  // 나가기
  socket.on('disconnect', () => {
    console.log(`❌ ${socket.id} disconnected`);
  });
};
