import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthorsLoader } from './loaders/authors.loader';
import { PostsLoader } from './loaders/posts.loader';
import { CommentsRepository } from '../comments/comments.repository';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      CommentsRepository,
      PostsRepository,
    ]),
  ],
  providers: [
    {
      provide: 'AuthorsLoader',
      useClass: AuthorsLoader,
    },
    {
      provide: 'PostsLoader',
      useClass: PostsLoader,
    },
  ],
  exports: ['AuthorsLoader', 'PostsLoader'],
})
export class CommonModule {}
