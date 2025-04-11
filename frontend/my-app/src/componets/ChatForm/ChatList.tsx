// src/components/ChatForm/ChatList.tsx
import { useEffect, useState } from 'react';
import { getMyChatRooms, ChatRoom } from '../../api/chat';
import { useAuth } from '../../hooks/useAuth';
import styles from './ChatList.module.css';
import { useChat } from '../../hooks/useChat';
import { deleteChatRoom } from '../../api/chat';
const ChatList = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const { user } = useAuth();
  const { enterRoom } = useChat();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getMyChatRooms();
        setRooms(data);
      } catch {
        alert('채팅방 목록을 불러오지 못했습니다.');
      }
    };
    fetchRooms();
  }, []);

  const handleDelete = async (roomId: number) => {
    if (!window.confirm('채팅방을 나가시겠습니까?')) return;

    try {
      await deleteChatRoom(roomId);
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    } catch {
      alert('삭제 실패');
    }
  };

  const getOtherNickname = (room: ChatRoom) => {
    if (!user) return '';
    return room.buyer.nickname === user.nickname ? room.seller.nickname : room.buyer.nickname;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>💬 내 채팅 목록</h2>
      {rooms.length === 0 ? (
        <p>채팅방이 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {rooms.map((room) => (
            <li
              key={room.id}
              className={styles.item}
              onClick={() => enterRoom(room.id)} // 전체 클릭
            >
              <div>
                <strong>{getOtherNickname(room)}</strong> 님과 <br />
                <span className={styles.postTitle}>『{room.post.title}』</span> 거래 중
              </div>
              <button
                className={styles.leaveBtn}
                onClick={(e) => {
                  e.stopPropagation(); // 부모 클릭 막기
                  handleDelete(room.id);
                }}
              >
                나가기
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
