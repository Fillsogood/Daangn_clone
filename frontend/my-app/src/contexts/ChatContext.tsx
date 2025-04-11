// src/contexts/ChatContext.tsx
import { createContext } from 'react';

interface ChatContextType {
  openChatUI: () => void;
  closeChatUI: () => void;
  enterRoom: (_roomId: number) => void;
  exitRoom: () => void;
  isOpen: boolean;
  mode: 'list' | 'room';
  selectedRoomId: number | null;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);
