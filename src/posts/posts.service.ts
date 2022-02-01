import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './models/post.entity';
import { PostPayload } from './dto/output/post.payload';
import { plainToClass } from 'class-transformer';
import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';
import { DeletePostsPayload } from './dto/output/delete-posts.payload';
import { GetPostsPayload } from './dto/output/get-posts.payload';
import {
  GetPostsInput,
  PostCategory,
  PostsSort,
} from './dto/input/get-posts.input';
import { UUID } from '../common/types';
import { MoreThanOrEqual, ObjectLiteral, OrderByCondition } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async createPost(
    post: CreatePostInput,
    authorId: UUID,
  ): Promise<PostPayload> {
    const instance = await this.postsRepository.create({
      ...post,
      authorId,
    });
    await this.postsRepository.save(instance);
    return plainToClass(PostPayload, instance);
  }

  async getPosts(postsData?: GetPostsInput): Promise<GetPostsPayload> {
    const where: ObjectLiteral = {};
    const order: OrderByCondition = {};

    if (postsData?.sort) {
      if (postsData.sort === PostsSort.CREATION_DATE) {
        order.createdAt = 'DESC';
      } else if (postsData.sort === PostsSort.LIKES_COUNT) {
        order.likesCount = 'DESC';
      }
    }

    if (postsData?.filter?.tags) {
      where.tags = postsData.filter.tags;
    }

    const items = await this.postsRepository.findPosts(where, order);
    return { items };
  }

  async getPostsInCategory(category: PostCategory): Promise<GetPostsPayload> {
    const where: ObjectLiteral = {};
    const order: OrderByCondition = {};

    switch (category) {
      case PostCategory.HOT:
        order.commentsCount = 'DESC';
        break;
      case PostCategory.BEST:
        order.likesCount = 'DESC';
        break;
      case PostCategory.NEWEST:
        order.createdAt = 'DESC';
        break;
    }

    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    where.createdAt = MoreThanOrEqual(yesterday);

    const items = await this.postsRepository.findPosts(where, order);
    return {
      items,
    };
  }

  async getPost(id: Post['id']): Promise<PostPayload> {
    const instance = await this.postsRepository.findOne(id);
    return plainToClass(PostPayload, instance);
  }

  async updatePost(updatePostData: UpdatePostInput): Promise<PostPayload> {
    const instance = await this.postsRepository.findOne(updatePostData.id);
    Object.assign(instance, updatePostData);
    await this.postsRepository.save(instance);
    return instance;
  }

  async removePost(ids: Post['id'][]): Promise<DeletePostsPayload> {
    try {
      const { affected } = await this.postsRepository.delete(ids);
      return {
        success: affected > 0,
        affectedRows: affected,
      };
    } catch (e) {}
  }
}
