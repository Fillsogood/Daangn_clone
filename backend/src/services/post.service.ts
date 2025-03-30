import prisma from '../config/prisma';
import { CreatePostInput, GetPostsQuery, UpdatePostInput } from '../types/post.types';

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

export const updatePost = async (postId: number, userId: number, data: UpdatePostInput) => {
  // 게시글 존재 여부 + 소유자 확인
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.userId !== userId) {
    throw new Error('권한이 없거나 게시글이 존재하지 않습니다.');
  }

  // 기존 이미지 모두 삭제
  if (data.images) {
    await prisma.postImage.deleteMany({ where: { postId } });
  }

  // 게시글 수정
  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      title: data.title,
      content: data.content,
      price: data.price,
      status: data.status,
      updatedAt: new Date(),
      images: data.images
        ? {
            create: data.images.map((url) => ({ url })),
          }
        : undefined,
    },
    include: {
      images: true,
    },
  });

  return updatedPost;
};
