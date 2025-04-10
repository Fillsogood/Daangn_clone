import { useCallback, useEffect, useState } from 'react';
import { fetchPosts, searchPosts, Post } from '../api/post';
import PostCard from '../componets/PostForm/PostCard';
import SearchBar from '../componets/SearchForm/SearchBar';
import styles from '../componets/PostForm/PostCard.module.css';
import { useAuth } from '../hooks/useAuth';
const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sort] = useState<'recent' | 'price_asc' | 'price_desc'>('recent');
  const { user } = useAuth();

  // useCallback으로 메모이제이션
  const handleSearch = useCallback(
    async (inputKeyword = keyword) => {
      try {
        const data = inputKeyword
          ? await searchPosts({ keyword: inputKeyword, sort, userId: user?.id })
          : await fetchPosts(user?.id);
        setPosts(data);
      } catch {
        setError('게시글을 불러올 수 없습니다.');
      }
    },
    [keyword, sort, user?.id] // 의존성: keyword, sort가 바뀔 때만 함수 새로 생성
  );

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div>
      <SearchBar
        onSearch={(kw) => {
          setKeyword(kw);
          handleSearch(kw);
        }}
      />

      <h2>
        {user
          ? posts.length > 0
            ? `${posts[0].user.region.name} 중고거래`
            : '내 지역 중고거래'
          : '전체 중고거래'}
      </h2>
      {error && <p>{error}</p>}
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <div className={styles.postList}>
          {posts.map((post) => (
            <PostCard key={post.id} post={{ ...post, liked: user ? post.liked : false }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostListPage;
