// src/api/post.ts
import api from './axios';

export interface Post {
  id: number;
  title: string;
  content: string;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    nickname: string;
    region: {
      name: string;
    };
  };
  images: {
    url: string;
  }[];
}

// ✅ 게시글 리스트 가져오는 API
export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<{ posts: Post[] }>('/posts');
  return res.data.posts;
};
