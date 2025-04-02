import { useCallback, useEffect, useState } from 'react';
import { fetchPosts, searchPosts, Post, fetchPostsRegion } from '../api/post';
import styles from '../componets/PostForm/PostCard.module.css';
import PostCard from '../componets/PostForm/PostCard';
import SearchBar from '../componets/SearchForm/SearchBar';
import { useAuth } from '../hooks/useAuth';

const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sort] = useState<'recent' | 'price_asc' | 'price_desc'>('recent');
  const { user, loading } = useAuth();

  const handleSearch = useCallback(
    async (inputKeyword = keyword) => {
      try {
        let data;
        if (inputKeyword) {
          data = await searchPosts({ keyword: inputKeyword, sort });
        } else {
          data = user ? await fetchPostsRegion() : await fetchPosts();
        }
        setPosts(data);
      } catch {
        setError('게시글을 불러올 수 없습니다.');
      }
    },
    [keyword, sort, user]
  );

  useEffect(() => {
    if (!loading) {
      handleSearch();
    }
  }, [handleSearch, loading]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <SearchBar
        onSearch={(kw) => {
          setKeyword(kw);
          handleSearch(kw);
        }}
      />

      <h2>{user ? posts[0]?.user.region.name : '전체'} 중고거래</h2>
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
