// src/components/PostCard.tsx
import styles from './PostCard.module.css';
import { Post, deletePost } from '../../api/post';
import image from '../../logo/스투시 비니.jpeg';
import { useEffect, useState } from 'react';
import { toggleLikePost, unlikePost } from '../../api/like'; // 찜 API 함수
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: Post;
  onUnlike?: (_postId: number) => void; // optional
  isMyPost?: boolean;
}

const PostCard = ({ post, onUnlike, isMyPost = false }: Props) => {
  const imageUrl = post.images[0]?.url || image; // 기본 이미지
  const regionPart = post.user?.region?.name?.split(' ')[2] || '미지정';
  const [liked, setLiked] = useState(post.liked); // 찜 여부 상태
  const { user } = useAuth(); // 로그인 상태
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(post.liked);
  }, [user, post.liked]);

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

  const handleEdit = () => {
    navigate(`/posts/edit/${post.id}`);
  };
  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await deletePost(post.id);
        alert('삭제 완료');
        // 새로고침 or 목록에서 제거
        window.location.reload(); // 임시: 또는 props로 부모에 onDelete 전달해서 제거해도 됨
      } catch {
        alert('삭제 실패');
      }
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

        <div className={styles.bottomRow}>
          <button onClick={handleLike} className={styles.likeBtn}>
            {liked ? '♥' : '♡'}
          </button>

          {isMyPost && (
            <div className={styles.actions}>
              <button onClick={handleEdit}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
