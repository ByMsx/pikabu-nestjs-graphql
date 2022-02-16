import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommentPayload } from '../dto/comment.payload';
import { CommentsService } from '../comments.service';
import { PostCommentsInput } from '../dto/post-comments.input';
import { PostCommentsPayload } from '../dto/post-comments.payload';

@Resolver(() => CommentPayload)
export class CommentsQueryResolver {
  constructor(private readonly service: CommentsService) {}

  @Query(() => PostCommentsPayload)
  async postComments(
    @Args('data') data: PostCommentsInput,
  ): Promise<PostCommentsPayload> {
    return this.service.getPostComments(data);
  }
}
