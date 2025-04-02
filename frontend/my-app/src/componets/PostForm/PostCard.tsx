// src/components/PostCard.tsx
import styles from './PostCard.module.css';
import { Post } from '../../api/post';
import image from '../../logo/스투시 비니.jpeg';
// import { useAuth } from '../../hooks/useAuth';
interface Props {
  post: Post;
}
// const { user } = useAuth();
const PostCard = ({ post }: Props) => {
  //   const imageUrl = post.images[0]?.url || image; // 기본 이미지

  return (
    <div className={styles.card}>
      <img src={image} alt={post.title} className={styles.image} />
      <div className={styles.info}>
        <p>{post.title}</p>
        <p className={styles.p}>{post.price.toLocaleString()}원</p>
        <span>{post.user.region.name.split(' ')[2]}</span>
        <br />
        <span className={styles.status}>{post.status}</span>
      </div>
    </div>
  );
};

export default PostCard;
