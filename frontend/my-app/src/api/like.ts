import api from './axios';

export const toggleLikePost = async (postId: number): Promise<{ liked: boolean }> => {
  const res = await api.post<{ liked: boolean }>(`/posts/${postId}/like`);
  return res.data;
};

export const unlikePost = async (postId: number): Promise<void> => {
  await api.delete(`/posts/${postId}/like`);
};
