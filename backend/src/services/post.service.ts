import prisma from '../config/prisma';
import { CreatePostInput, GetPostsQuery } from '../types/post.types';

export const createPost = async (userId: number, input: CreatePostInput) => {
  const { title, content, price, images } = input;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      price,
      userId,
      images: {
        create: images.map((url) => ({ url })),
      },
    },
    include: {
      images: true,
    },
  });

  return post;
};

export const getPosts = async (query: GetPostsQuery) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: { nickname: true },
      },
      images: {
        take: 1, // 대표 이미지 1장만
        select: { url: true },
      },
    },
  });

  return posts;
};

export const getPostById = async (id: number) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      user: {
        select: { nickname: true },
      },
      images: {
        select: { url: true },
      },
    },
  });
};
