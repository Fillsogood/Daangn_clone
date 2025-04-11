// src/components/ChatForm/ChatModal.tsx
import { useChat } from '../../contexts/ChatContext';
import ChatList from './ChatList';
import ChatRoomPage from '../../pages/ChatRoomPage';
import styles from './ChatModal.module.css';

const ChatModal = () => {
  const { isOpen, mode, selectedRoomId, closeChatUI, exitRoom } = useChat();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span>💬 채팅</span>
          {mode === 'room' && <button onClick={exitRoom}>⬅ 목록</button>}
          <button onClick={closeChatUI}>-</button>
        </div>

        {mode === 'list' && <ChatList />}
        {mode === 'room' && selectedRoomId !== null && (
          <ChatRoomPage roomId={selectedRoomId} onClose={exitRoom} />
        )}
      </div>
    </div>
  );
};

export default ChatModal;
