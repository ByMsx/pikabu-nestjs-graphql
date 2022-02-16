import DataLoader from 'dataloader';
import { Loader } from 'nestjs-graphql-dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UUID } from '../../common/types';
import { CommentBookmarkPayload } from '../dto/bookmark.payload';
import { CommentPayload } from '../../comments/dto/comment.payload';

@Resolver(() => CommentBookmarkPayload)
export class CommentBookmarkFieldsResolver {
  @ResolveField('comment', () => CommentPayload, { nullable: true })
  async comment(
    @Parent() commentBookmark: CommentBookmarkPayload,
    @Loader('CommentsLoader') commentsLoader: DataLoader<UUID, CommentPayload>,
  ): Promise<CommentPayload> {
    if (!commentBookmark.commentId) return null;
    return commentsLoader.load(commentBookmark.commentId);
  }
}
