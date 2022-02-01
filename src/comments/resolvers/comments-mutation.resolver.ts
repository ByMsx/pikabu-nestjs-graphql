import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentPayload } from '../dto/comment.payload';
import { CreateCommentInput } from '../dto/create-comment.input';
import { RequestUser, UUID } from '../../common/types';
import { CommentsService } from '../comments.service';
import { LikesService } from '../../likes/likes.service';
import { CurrentUser } from '../../auth/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';

@Resolver(() => CommentPayload)
@UseGuards(GqlAuthGuard)
export class CommentsMutationResolver {
  constructor(
    private readonly service: CommentsService,
    private readonly likesService: LikesService,
  ) {}

  @Mutation(() => CommentPayload)
  async createComment(
    @Args('commentData') commentData: CreateCommentInput,
    @CurrentUser() user: RequestUser,
  ): Promise<CommentPayload> {
    return this.service.createComment(commentData, user.id);
  }

  @Mutation(() => CommentPayload)
  async likeComment(
    @Args('commentId') commentId: UUID,
    @CurrentUser() user: RequestUser,
  ): Promise<CommentPayload> {
    await this.likesService.createLike('comment', commentId, user.id, 1);
    return this.service.getComment(commentId);
  }

  @Mutation(() => CommentPayload)
  async dislikeComment(
    @Args('commentId') commentId: UUID,
    @CurrentUser() user: RequestUser,
  ): Promise<CommentPayload> {
    await this.likesService.createLike('comment', commentId, user.id, -1);
    return this.service.getComment(commentId);
  }
}
