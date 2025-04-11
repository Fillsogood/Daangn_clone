import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPosts, searchPosts, Post } from '../api/post';
import PostCard from '../componets/PostForm/PostCard';
import SearchBar from '../componets/SearchForm/SearchBar';
import styles from '../componets/PostForm/PostCard.module.css';
import { useAuth } from '../hooks/useAuth';

const LIMIT = 10;

const PostListPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState<'recent' | 'price_asc' | 'price_desc'>('recent');
  const [error, setError] = useState('');
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      const newPosts = keyword
        ? await searchPosts({ keyword, sort, page, limit: LIMIT, userId: user?.id })
        : await fetchPosts(user?.id, page, LIMIT);

      setPosts((prev) => {
        const combined = page === 1 ? newPosts : [...prev, ...newPosts];
        const uniqueMap = new Map<number, Post>();
        combined.forEach((post) => uniqueMap.set(post.id, post));
        return Array.from(uniqueMap.values());
      });
      setHasMore(newPosts.length === LIMIT);
    } catch {
      setError('게시글을 불러올 수 없습니다.');
    }
  }, [keyword, sort, page, user?.id]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore]);

  const handleSearch = async (inputKeyword: string, selectedSort: typeof sort) => {
    const trimmed = inputKeyword.trim();
    if (trimmed === '') return;
    setKeyword(trimmed);
    setSort(selectedSort);
    setPage(1);
    try {
      const newPosts = await searchPosts({
        keyword: trimmed,
        sort: selectedSort,
        page: 1,
        limit: LIMIT,
        userId: user?.id,
      });
      setPosts(newPosts);
      setHasMore(newPosts.length === LIMIT);
    } catch {
      setError('게시글을 불러올 수 없습니다.');
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h2>
        {user
          ? posts.length > 0
            ? `${posts[0].user.region.name} 중고거래`
            : '내 지역 중고거래'
          : '전체 중고거래'}
      </h2>
      {error && <p>{error}</p>}
      <div className={styles.postList}>
        {posts.map((post) => (
          <PostCard key={post.id} post={{ ...post, liked: user ? post.liked : false }} />
        ))}
      </div>
      {hasMore && (
        <div ref={observerRef} className={styles.loader}>
          로딩 중...
        </div>
      )}
    </div>
  );
};

export default PostListPage;
