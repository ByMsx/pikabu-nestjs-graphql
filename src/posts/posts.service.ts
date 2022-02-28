import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './models/post.entity';
import { PostPayload } from './dto/output/post.payload';
import { plainToClass, plainToInstance } from 'class-transformer';
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
import { PaginationService } from '../common/pagination-service.class';
import { CreatePostPayload } from './dto/output/create-post.payload';
import { MutationError, MutationStatus } from '../common/dto/mutation.payload';
import { UpdatePostPayload } from './dto/output/update-post.payload';
import { LikePostInput } from './dto/input/like-post.input';
import { LikesRepository } from '../likes/likes.repository';
import { LikesDelegate } from '../common/likes-delegate.class';
import { LikePostPayload } from './dto/output/like-post.payload';

@Injectable()
export class PostsService extends PaginationService {
  private likesDelegate: LikesDelegate<Post, PostPayload, LikePostPayload>;

  constructor(
    private postsRepository: PostsRepository,
    private likes: LikesRepository,
  ) {
    super();

    this.likesDelegate = new LikesDelegate(likes, postsRepository, PostPayload);
  }

  async createPost(
    post: CreatePostInput,
    authorId: UUID,
  ): Promise<CreatePostPayload> {
    try {
      const instance = await this.postsRepository.create({
        ...post,
        authorId,
      });
      await this.postsRepository.save(instance);
      const record = plainToClass(PostPayload, instance);

      return {
        record,
        error: null,
        recordID: record.id,
        status: MutationStatus.SUCCESS,
      };
    } catch (e) {
      return {
        error: new MutationError(e),
        status: MutationStatus.FAIL,
      };
    }
  }

  async getPosts(input: GetPostsInput): Promise<GetPostsPayload> {
    const where: ObjectLiteral = {};
    const order: OrderByCondition = {};

    if (input.filter?.category) {
      switch (input.filter.category) {
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
    }

    if (input?.sort) {
      if (input.sort === PostsSort.CREATION_DATE) {
        order.createdAt = 'DESC';
      } else if (input.sort === PostsSort.LIKES_COUNT) {
        order.likesCount = 'DESC';
      }
    }

    if (input?.filter?.tags) {
      where.tags = input.filter.tags;
    }

    if (input?.filter?.title) {
      /* это не костыль, а абстракция от репозитория.
       * Чтобы отказаться от `_like`, нам нужно вызывать функцию Like из TypeOrm,
       * а это уже приводит к нарушению абстракции,
       * т.к. сервис узнает об ORM, а о ней должен знать только репозиторий */
      where._like = {
        title: `%${input.filter.title}%`,
      };
    }

    const pagination = this.getSkipLimit(input);

    const items = await this.postsRepository.findPosts(
      where,
      order,
      pagination,
    );
    const count = await this.postsRepository.postsCount(where);
    const pageInfo = this.getPageInfo(input.page, input.perPage, count);

    return { items, pageInfo };
  }

  async getPost(id: Post['id']): Promise<PostPayload> {
    const instance = await this.postsRepository.findOne(id);
    return plainToClass(PostPayload, instance);
  }

  async updatePost(
    updatePostData: UpdatePostInput,
  ): Promise<UpdatePostPayload> {
    try {
      const instance = await this.postsRepository.findOne(updatePostData.id);
      Object.assign(instance, updatePostData);
      await this.postsRepository.save(instance);
      return {
        recordID: instance.id,
        record: plainToInstance(PostPayload, instance),
        status: MutationStatus.SUCCESS,
        error: null,
      };
    } catch (e) {
      return {
        error: new MutationError(e.message),
        status: MutationStatus.FAIL,
      };
    }
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

  likePost(postData: LikePostInput, userId: UUID): Promise<LikePostPayload> {
    return this.likesDelegate.like(postData.postId, userId);
  }

  dislikePost(postData: LikePostInput, userId: UUID): Promise<LikePostPayload> {
    return this.likesDelegate.dislike(postData.postId, userId);
  }
}
