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

@Injectable()
export class CommentsService {
  private likesDelegate: LikesDelegate<
    Comment,
    CommentPayload,
    LikeCommentPayload
  >;

  constructor(
    private repo: CommentsRepository,
    private likes: LikesRepository,
  ) {
    this.likesDelegate = new LikesDelegate(likes, repo, CommentPayload);
  }

  async getPostComments(postId: UUID): Promise<CommentPayload[]> {
    return this.repo.find({ where: { postId } });
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
        record,
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
