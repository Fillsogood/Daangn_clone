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

// 게시글 리스트 조회
export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<{ posts: Post[] }>('/posts');
  return res.data.posts;
};

interface CreatePostInput {
  title: string;
  content: string;
  price: number;
  images: string[]; // 이미지 URL 배열
}

//게시글 등록
export const createPost = async (data: CreatePostInput) => {
  const res = await api.post('/posts', data);
  return res.data;
};

interface SearchParams {
  keyword: string;
  sort?: 'recent' | 'price_asc' | 'price_desc';
  regionId?: number;
}

export const searchPosts = async (params: SearchParams): Promise<Post[]> => {
  const res = await api.get<{ posts: Post[] }>('/posts/search', { params });
  return res.data.posts;
};
