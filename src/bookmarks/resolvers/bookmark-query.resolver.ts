import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookmarkPayload } from '../dto/bookmark.payload';
import { GetBookmarksInput } from '../dto/get-bookmarks.input';
import { BookmarksService } from '../bookmarks.service';
import { GetBookmarksPayload } from '../dto/get-bookmarks.payload';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import { RequestUser } from '../../common/types';

@UseGuards(GqlAuthGuard)
@Resolver(() => BookmarkPayload)
export class BookmarkQueryResolver {
  constructor(private readonly service: BookmarksService) {}

  @Query(() => GetBookmarksPayload, { name: 'bookmarks' })
  async bookmarks(
    @Args('bookmarksData') input: GetBookmarksInput,
    @CurrentUser() user: RequestUser,
  ): Promise<GetBookmarksPayload> {
    return this.service.getBookmarks(input, user.id);
  }
}
