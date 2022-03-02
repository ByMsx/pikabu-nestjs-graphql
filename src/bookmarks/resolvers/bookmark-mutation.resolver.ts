import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RequestUser, UUID } from '../../common/types';
import { CurrentUser } from '../../auth/current-user.decorator';
import { BookmarksService } from '../bookmarks.service';
import { BookmarkPayload } from '../dto/bookmark.payload';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateCommentBookmarkPayload } from '../dto/create-comment-bookmark.payload';
import { CreatePostBookmarkPayload } from '../dto/create-post-bookmark.payload';

@Resolver('bookmarks')
@UseGuards(GqlAuthGuard)
export class BookmarkMutationResolver {
  constructor(private service: BookmarksService) {}

  @Mutation(() => CreateCommentBookmarkPayload)
  async bookmarkComment(
    @Args('commentId') commentId: UUID,
    @CurrentUser() user: RequestUser,
  ): Promise<CreateCommentBookmarkPayload> {
    return this.service.createCommentBookmark(commentId, user.id);
  }

  @Mutation(() => CreatePostBookmarkPayload)
  async bookmarkPost(
    @Args('postId') postId: UUID,
    @CurrentUser() user: RequestUser,
  ): Promise<typeof BookmarkPayload> {
    return this.service.createPostBookmark(postId, user.id);
  }
}
