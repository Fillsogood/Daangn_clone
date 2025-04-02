// src/pages/PostListPage.tsx
import { useEffect, useState } from 'react';
import { fetchPosts, Post } from '../api/post';
import styles from '../componets/PostForm/PostCard.module.css';
import PostCard from '../componets/PostForm/PostCard';

const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch {
        setError('게시글을 불러올 수 없습니다.');
      }
    };
    loadPosts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>중고거래 게시글</h2>
      {error && <p>{error}</p>}
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostListPage;
