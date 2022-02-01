import DataLoader from 'dataloader';
import { Loader } from 'nestjs-graphql-dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostPayload } from '../dto/output/post.payload';
import { CommentPayload } from '../../comments/dto/comment.payload';
import { UserPayload } from '../../auth/dto/user.payload';
import { UUID } from '../../common/types';

@Resolver(() => PostPayload)
export class PostsFieldResolver {
  @ResolveField('likesCount', () => Number)
  async likesCount(
    @Parent() post: PostPayload,
    @Loader('PostLikesCountLoader')
    likesCountLoader: DataLoader<UUID, { count: number }>,
  ): Promise<number> {
    const { count } = await likesCountLoader.load(post.id);
    return count;
  }

  @ResolveField('dislikesCount', () => Number)
  async dislikesCount(
    @Parent() post: PostPayload,
    @Loader('PostDislikesCountLoader')
    dislikesCountLoader: DataLoader<UUID, { count: number }>,
  ): Promise<number> {
    const { count } = await dislikesCountLoader.load(post.id);
    return count;
  }

  @ResolveField('comments', () => [CommentPayload])
  async comments(
    @Parent() post: PostPayload,
    @Loader('CommentLoader')
    commentsLoader: DataLoader<UUID, { comments: CommentPayload[] }>,
  ): Promise<CommentPayload[]> {
    const { comments } = await commentsLoader.load(post.id);
    return comments;
  }

  @ResolveField('author', () => UserPayload)
  async author(
    @Parent() post: PostPayload,
    @Loader('AuthorsLoader') authorsLoader: DataLoader<UUID, UserPayload>,
  ): Promise<UserPayload> {
    return authorsLoader.load(post.authorId);
  }
}
