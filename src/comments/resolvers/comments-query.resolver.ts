import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommentPayload } from '../dto/comment.payload';
import { UUID } from '../../common/types';
import { CommentsService } from '../comments.service';

@Resolver(() => CommentPayload)
export class CommentsQueryResolver {
  constructor(private readonly service: CommentsService) {}

  @Query(() => [CommentPayload])
  async postComments(@Args('postId') postId: UUID): Promise<CommentPayload[]> {
    return this.service.getPostComments(postId);
  }
}
