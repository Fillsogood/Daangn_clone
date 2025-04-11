import api from './axios';

export interface ChatRoom {
  id: number;
  post: {
    title: string;
  };
  buyer: {
    nickname: string;
  };
  seller: {
    nickname: string;
  };
}

interface ChatMessage {
  id: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    nickname: string;
  };
}
export const getMyChatRooms = async (): Promise<ChatRoom[]> => {
  const res = await api.get<{ rooms: ChatRoom[] }>('/chatrooms');
  return res.data.rooms;
};

export const createChatRoom = async (postId: number): Promise<ChatRoom> => {
  const res = await api.post<{ room: ChatRoom }>('/chatrooms', { postId });
  return res.data.room;
};

export const fetchChatMessages = async (roomId: number): Promise<ChatMessage[]> => {
  const res = await api.get<{ messages: ChatMessage[] }>(`/chatrooms/${roomId}/messages`);
  return res.data.messages;
};

export const sendChatMessage = async (roomId: number, content: string): Promise<ChatMessage> => {
  const res = await api.post<{ message: ChatMessage }>(`/chatrooms/${roomId}/messages`, {
    content,
  });
  return res.data.message;
};

export const deleteChatRoom = async (roomId: number) => {
  const res = await api.delete(`/chatrooms/${roomId}`);
  return res.data;
};
