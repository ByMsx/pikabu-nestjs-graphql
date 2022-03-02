import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from '../posts/posts.repository';
import { CommentsQueryResolver } from './resolvers/comments-query.resolver';
import { CommentsMutationResolver } from './resolvers/comments-mutation.resolver';
import { CommentsFieldsResolver } from './resolvers/comments-fields.resolver';
import { CommentLikesCountLoader } from './loaders/comment-likes-count.loader';
import { LikesRepository } from '../likes/likes.repository';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsRepository,
      PostsRepository,
      LikesRepository,
    ]),
    CommonModule,
  ],
  providers: [
    CommentsService,
    CommentsQueryResolver,
    CommentsMutationResolver,
    CommentsFieldsResolver,
    CommentLikesCountLoader.forLikes(),
    CommentLikesCountLoader.forDislikes(),
  ],
})
export class CommentsModule {}
