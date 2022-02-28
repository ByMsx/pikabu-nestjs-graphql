import { Injectable } from '@nestjs/common';
import { UUID } from '../common/types';
import { CommentsRepository } from './comments.repository';
import { CreateCommentInput } from './dto/create-comment.input';
import { CommentPayload } from './dto/comment.payload';
import { CreateCommentPayload } from './dto/create-comment.payload';
import { MutationError, MutationStatus } from '../common/dto/mutation.payload';
import { LikeCommentPayload } from './dto/like-comment.payload';
import { LikesRepository } from '../likes/likes.repository';
import { LikeCommentInput } from './dto/like-comment.input';
import { LikesDelegate } from '../common/likes-delegate.class';
import { Comment } from './models/comment.entity';
import { PaginationService } from '../common/pagination-service.class';
import { CommentsSort, PostCommentsInput } from './dto/post-comments.input';
import { PostCommentsPayload } from './dto/post-comments.payload';
import { OrderByCondition } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentsService extends PaginationService {
  private likesDelegate: LikesDelegate<
    Comment,
    CommentPayload,
    LikeCommentPayload
  >;

  constructor(
    private repo: CommentsRepository,
    private likes: LikesRepository,
  ) {
    super();
    this.likesDelegate = new LikesDelegate(likes, repo, CommentPayload);
  }

  async getPostComments(data: PostCommentsInput): Promise<PostCommentsPayload> {
    const pagination = this.getSkipLimit(data);

    const order: OrderByCondition = {};
    switch (data.sort) {
      case CommentsSort.CREATED_AT:
        order.createdAt = 'DESC';
        break;
      case CommentsSort.LIKES_COUNT:
        order.likesCount = 'DESC';
        break;
    }

    const items = await this.repo.getPostComments(
      data.postId,
      order,
      pagination,
    );
    const count = await this.repo.countPostComments(data.postId);
    const pageInfo = this.getPageInfo(data.page, data.perPage, count);

    return {
      items: plainToInstance(CommentPayload, items),
      pageInfo,
    };
  }

  async createComment(
    commentData: CreateCommentInput,
    authorId: UUID,
  ): Promise<CreateCommentPayload> {
    try {
      const record = this.repo.create({
        ...commentData,
        authorId,
      });
      await this.repo.save(record);
      return {
        record: plainToInstance(CommentPayload, record),
        recordID: record.id,
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

  async likeComment(
    commentData: LikeCommentInput,
    userId: UUID,
  ): Promise<LikeCommentPayload> {
    return this.likesDelegate.like(commentData.commentId, userId);
  }

  async dislikeComment(
    commentData: LikeCommentInput,
    userId: UUID,
  ): Promise<LikeCommentPayload> {
    return this.likesDelegate.dislike(commentData.commentId, userId);
  }
}
