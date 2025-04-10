import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, Post } from '../api/post';
import PostForm from '../componets/PostForm/PostCreate';

const PostEditPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      const data = await getPostById(Number(id));
      setPost(data);
    };
    loadPost();
  }, [id]);

  if (!post) return <p>로딩 중...</p>;

  return (
    <PostForm
      initialData={{
        title: post.title,
        content: post.content,
        price: post.price,
        images: post.images.map((img) => img.url),
      }}
      postId={post.id}
    />
  );
};

export default PostEditPage;
