export interface SignupInput {
  email: string;
  password: string;
  nickname: string;
  regionId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}
