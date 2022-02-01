import { Injectable } from '@nestjs/common';
import { UUID } from '../common/types';
import { CommentsRepository } from './comments.repository';
import { CreateCommentInput } from './dto/create-comment.input';
import { CommentPayload } from './dto/comment.payload';

@Injectable()
export class CommentsService {
  constructor(private repo: CommentsRepository) {}

  async getPostComments(postId: UUID): Promise<CommentPayload[]> {
    return this.repo.find({ where: { postId } });
  }

  async createComment(
    commentData: CreateCommentInput,
    authorId: UUID,
  ): Promise<CommentPayload> {
    const instance = this.repo.create({
      ...commentData,
      authorId,
    });
    await this.repo.save(instance);
    return instance;
  }

  getComment(commentId: UUID): Promise<CommentPayload> {
    return this.repo.findOne(commentId);
  }
}
