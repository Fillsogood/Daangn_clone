// src/components/PostCard.tsx
import styles from './PostCard.module.css';
import { Post } from '../../api/post';
import image from '../../logo/스투시 비니.jpeg';
import { useState } from 'react';
import { toggleLikePost, unlikePost } from '../../api/like'; // 찜 API 함수
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: Post;
  onUnlike?: (_postId: number) => void; // optional
}

const PostCard = ({ post, onUnlike }: Props) => {
  const imageUrl = post.images[0]?.url || image; // 기본 이미지
  const regionPart = post.user?.region?.name?.split(' ')[2] || '미지정';
  const [liked, setLiked] = useState(post.liked); // 찜 여부 상태
  const { user } = useAuth(); // 로그인 상태
  const navigate = useNavigate();
  const handleLike = async () => {
    if (!user) {
      alert('로그인 후 사용해주세요!');
      navigate('/login');
      return;
    }

    try {
      if (liked) {
        await unlikePost(post.id); // 찜 해제
        setLiked(false);
        onUnlike?.(post.id);
      } else {
        await toggleLikePost(post.id); // 찜 등록
        setLiked(true);
      }
    } catch {
      alert('찜 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={post.title} className={styles.image} />
      <div className={styles.info}>
        <p className={styles.title}>{post.title}</p>
        <p className={styles.price}>{post.price.toLocaleString()}원</p>
        <span>{regionPart}</span>
        <br />
        <span className={styles.status}>{post.status}</span>
        <button onClick={handleLike} className={styles.likeBtn}>
          {liked ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
