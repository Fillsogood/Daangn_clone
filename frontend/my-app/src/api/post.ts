// src/api/post.ts
import api from './axios';

export interface Region {
  name: string;
}

export interface UserSummary {
  id: number;
  nickname: string;
  region: Region;
}

export interface PostImage {
  url: string;
}

export interface Like {
  id: number;
  userId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  price: number;
  status: string;
  userId: number;
  createdAt: string; // ISO 문자열
  updatedAt: string;
  user: UserSummary;
  images: PostImage[];
  likes: Like[];
  liked: boolean;
}

export interface FetchPostsResponse {
  posts: Post[];
}

// 지역 기반 게시글 리스트 조회
export const fetchPostsRegion = async (): Promise<Post[]> => {
  const res = await api.get<{ posts: Post[] }>('/posts/region');
  return res.data.posts;
};

export const fetchPosts = async (userId?: number, page = 1, limit = 10): Promise<Post[]> => {
  const res = await api.get<FetchPostsResponse>('/posts', {
    params: { page, limit },
    headers: userId ? { 'X-User-Id': userId } : {},
  });
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
  page?: number;
  limit?: number;
  regionId?: number;
  userId?: number;
}

export const searchPosts = async (
  params: SearchParams & { page?: number; limit?: number }
): Promise<Post[]> => {
  const res = await api.get<{ posts: Post[] }>('/posts/search', {
    params: {
      keyword: params.keyword,
      sort: params.sort,
      page: params.page || 1,
      limit: params.limit || 10,
      userId: params.userId, // 로그인된 유저라면
    },
  });
  return res.data.posts;
};
// 게시글 삭제
export const deletePost = async (postId: number) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};

export type UpdatePostData = {
  title: string;
  content: string;
  price: number;
  status?: 'selling' | 'reserved' | 'sold'; // 상태 선택 가능 (옵션)
  images?: string[]; // 이미지 URL 배열
};

// 게시글 수정
export const updatePost = async (postId: number, data: UpdatePostData) => {
  const res = await api.patch(`/posts/${postId}`, data);
  return res.data;
};

//특정 게시물 조회
export const getPostById = async (id: number): Promise<Post> => {
  const res = await api.get<{ post: Post }>(`/posts/${id}`);
  return res.data.post;
};

// S3 이미지 삭제

export const deleteImageFromS3 = async (key: string) => {
  const res = await api.post('/posts/s3/image/delete', { key });
  return res.data;
};
