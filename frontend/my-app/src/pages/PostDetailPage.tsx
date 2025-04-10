// PostDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/post';
import { Post } from '../api/post';
import styles from '../componets/PostForm/PostDetail.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;
        const data = await getPostById(Number(id));
        setPost(data);
      } catch {
        setError('게시글을 불러올 수 없습니다.');
      }
    };
    load();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>로딩 중...</p>;

  return (
    <div className={styles.detailContainer}>
      <h2>{post.title}</h2>

      <div className={styles.metaInfo}>
        <span>
          <strong>가격:</strong> {post.price.toLocaleString()}원
        </span>
        <span> | </span>
        <span>
          <strong>작성자:</strong> {post.user?.nickname}
        </span>
      </div>

      {post.images?.length > 0 && (
        <div className={styles.carouselWrapper}>
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
            {post.images.map((img, idx) => (
              <div key={idx} className={styles.carouselItem}>
                <img src={img.url} alt={`img-${idx}`} />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      <div className={styles.contentBox}>
        <h3>상세 설명</h3>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetailPage;
