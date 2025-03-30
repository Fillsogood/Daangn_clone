export interface CreatePostInput {
  title: string;
  content: string;
  price: number;
  images: string[];
}

export interface GetPostsQuery {
  page?: number;
  limit?: number;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  price?: number;
  status?: string;
  images?: string[]; // 새 이미지 배열로 교체
}
