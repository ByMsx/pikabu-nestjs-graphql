import { Module } from '@nestjs/common';
import { PostsFieldResolver } from './resolvers/posts-field.resolver';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { LikesModule } from '../likes/likes.module';
import { PostLikesCountLoader } from './loaders/post-likes-count.loader';
import { LikesRepository } from '../likes/likes.repository';
import { CommentsLoader } from './loaders/comments.loader';
import { PostsMutationResolver } from './resolvers/posts-mutation.resolver';
import { PostsQueryResolver } from './resolvers/posts-query.resolver';
import { UsersRepository } from '../users/users.repository';
import { CommonModule } from '../common/common.module';
import { IsPostsOwnerGuard } from './is-posts-owner.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsRepository,
      CommentsRepository,
      LikesRepository,
      UsersRepository,
    ]),
    CommonModule,
    LikesModule,
  ],
  providers: [
    IsPostsOwnerGuard,
    PostsFieldResolver,
    PostsMutationResolver,
    PostsQueryResolver,
    PostsService,
    PostLikesCountLoader.forLikes(),
    PostLikesCountLoader.forDislikes(),
    {
      provide: 'CommentLoader',
      useClass: CommentsLoader,
    },
  ],
})
export class PostsModule {}
