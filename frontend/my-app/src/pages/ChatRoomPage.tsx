import { useEffect, useRef, useState } from 'react';
import { socket } from '../utils/soket';
import { fetchChatMessages } from '../api/chat';
import { useAuth } from '../hooks/useAuth';
import styles from '../componets/ChatForm/ChatRoomPage.module.css';

interface ChatMessage {
  id: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    nickname: string;
  };
}

interface ChatRoomPageProps {
  roomId?: number | null;
  onClose: () => void;
}

const ChatRoomPage = ({ roomId }: ChatRoomPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roomId == null) return;

    const loadMessages = async () => {
      const data = await fetchChatMessages(roomId);
      setMessages(data);
    };

    loadMessages();
  }, [roomId]);

  useEffect(() => {
    if (roomId == null) return;

    socket.emit('chat:join', String(roomId));

    const handleMessage = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('chat:receive', handleMessage);
    return () => {
      socket.off('chat:receive', handleMessage);
    };
  }, [roomId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!user?.id || !roomId) return;

    socket.emit('chat:send', {
      roomId,
      senderId: user.id,
      content: input,
    });
    setInput('');
  };

  return (
    <>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.sender?.id === user?.id ? styles.myMsg : styles.otherMsg
            }`}
          >
            <div className={styles.nickname}>{msg.sender?.nickname ?? '알 수 없음'}</div>
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className={styles.inputBox}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </>
  );
};

export default ChatRoomPage;
