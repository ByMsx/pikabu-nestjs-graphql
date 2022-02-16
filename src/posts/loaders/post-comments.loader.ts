import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { UUID } from '../../common/types';
import { CommentPayload } from '../../comments/dto/comment.payload';
import { CommentsRepository } from '../../comments/comments.repository';

@Injectable()
export class PostCommentsLoader extends OrderedNestDataLoader<
  UUID,
  { comments: CommentPayload[] }
> {
  constructor(private readonly repo: CommentsRepository) {
    super();
  }

  protected getOptions = () => ({
    propertyKey: 'postId',
    query: async (
      postIds: UUID[],
    ): Promise<{ postId: UUID; comments: CommentPayload[] }[]> => {
      return this.repo.getPostsComments(postIds);
    },
  });
}
