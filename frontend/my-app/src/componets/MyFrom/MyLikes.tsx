import { useEffect, useState } from 'react';
import { fetchLikedPosts } from '../../api/like';
import { Post } from '../../api/post';
import PostCard from '../PostForm/PostCard';
import styles from './MyPosts.module.css';

const MyLikes = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchLikedPosts();
      setPosts(data);
    };
    load();
  }, []);

  const handleUnlike = (postId: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <section className={styles.section}>
      <h3>❤️ 찜한 게시글</h3>
      {posts.length === 0 ? (
        <p>찜한 게시글이 없습니다.</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUnlike={handleUnlike} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyLikes;
