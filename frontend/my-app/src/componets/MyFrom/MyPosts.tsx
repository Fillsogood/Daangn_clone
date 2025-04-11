import { useEffect, useState } from 'react';
import { fetchMyPosts } from '../../api/user';
import { Post } from '../../api/post';
import PostCard from '../PostForm/PostCard';
import styles from './MyPosts.module.css';

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMyPosts();
      setPosts(data);
    };
    load();
  }, []);

  return (
    <section className={styles.section}>
      <h3>📝 내가 쓴 글</h3>
      {posts.length === 0 ? (
        <p>작성한 게시글이 없습니다.</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isMyPost isClickable={false} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyPosts;
