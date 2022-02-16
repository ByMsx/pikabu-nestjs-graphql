import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksRepository } from './bookmarks.repository';
import { BookmarksService } from './bookmarks.service';
import { BookmarkMutationResolver } from './resolvers/bookmark-mutation.resolver';
import { CommonModule } from '../common/common.module';
import { BookmarkQueryResolver } from './resolvers/bookmark-query.resolver';
import { CommentBookmarkFieldsResolver } from './resolvers/comment-bookmark-fields.resolver';
import { CommentsLoader } from './loaders/comments.loader';
import { CommentsRepository } from '../comments/comments.repository';
import { PostBookmarkFieldsResolver } from './resolvers/post-bookmark-fields.resolver';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([BookmarksRepository, CommentsRepository]),
  ],
  providers: [
    BookmarksService,
    BookmarkQueryResolver,
    BookmarkMutationResolver,
    CommentBookmarkFieldsResolver,
    PostBookmarkFieldsResolver,
    {
      provide: 'CommentsLoader',
      useClass: CommentsLoader,
    },
  ],
})
export class BookmarksModule {}
