import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentPayload } from '../dto/comment.payload';
import { CreateCommentInput } from '../dto/create-comment.input';
import { RequestUser } from '../../common/types';
import { CommentsService } from '../comments.service';
import { CurrentUser } from '../../auth/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateCommentPayload } from '../dto/create-comment.payload';
import { LikeCommentPayload } from '../dto/like-comment.payload';
import { LikeCommentInput } from '../dto/like-comment.input';

@Resolver(() => CommentPayload)
@UseGuards(GqlAuthGuard)
export class CommentsMutationResolver {
  constructor(private readonly service: CommentsService) {}

  @Mutation(() => CreateCommentPayload)
  async createComment(
    @Args('commentData') commentData: CreateCommentInput,
    @CurrentUser() user: RequestUser,
  ): Promise<CreateCommentPayload> {
    return this.service.createComment(commentData, user.id);
  }

  @Mutation(() => LikeCommentPayload)
  async likeComment(
    @Args('commentData') commentData: LikeCommentInput,
    @CurrentUser() user: RequestUser,
  ): Promise<LikeCommentPayload> {
    return this.service.likeComment(commentData, user.id);
  }

  @Mutation(() => LikeCommentPayload)
  async dislikeComment(
    @Args('commentData') commentData: LikeCommentInput,
    @CurrentUser() user: RequestUser,
  ): Promise<LikeCommentPayload> {
    return this.service.dislikeComment(commentData, user.id);
  }
}
