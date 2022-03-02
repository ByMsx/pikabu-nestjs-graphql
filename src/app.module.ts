import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-graphql-dataloader';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    AuthModule,
    BookmarksModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}
