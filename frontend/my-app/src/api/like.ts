import api from './axios';
import { Post } from './post';

export const toggleLikePost = async (postId: number) => {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
};

export const unlikePost = async (postId: number): Promise<void> => {
  await api.delete(`/posts/${postId}/like`);
};

export const fetchLikedPosts = async (): Promise<Post[]> => {
  const res = await api.get<{ posts: Post[] }>('/users/me/likes');
  return res.data.posts;
};
