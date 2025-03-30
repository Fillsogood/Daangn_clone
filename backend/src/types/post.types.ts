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
