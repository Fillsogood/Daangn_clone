import React from 'react';
import { useState } from 'react';
import { ChatContext } from './ChatContext';

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'list' | 'room'>('list');
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const openChatUI = () => {
    setIsOpen(true);
    setMode('list');
    setSelectedRoomId(null);
  };

  const closeChatUI = () => {
    setIsOpen(false);
    setMode('list');
    setSelectedRoomId(null);
  };

  const enterRoom = (roomId: number) => {
    setMode('room');
    setSelectedRoomId(roomId);
  };

  const exitRoom = () => {
    setMode('list');
    setSelectedRoomId(null);
  };

  return (
    <ChatContext.Provider
      value={{
        openChatUI,
        closeChatUI,
        enterRoom,
        exitRoom,
        isOpen,
        mode,
        selectedRoomId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
