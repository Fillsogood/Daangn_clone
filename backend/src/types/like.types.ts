export interface Like {
  post: Post; // Post 타입을 정의해야 합니다.
}

export interface Post {
  id: number;
  title: string;
  content: string;
  status: string;
  price: number;
  userId: number;
  createdAt: Date;
}
