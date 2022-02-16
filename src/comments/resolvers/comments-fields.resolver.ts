import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentPayload } from '../dto/comment.payload';
import { PostPayload } from '../../posts/dto/output/post.payload';
import { Loader } from 'nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { UUID } from '../../common/types';
import { UserPayload } from '../../auth/dto/user.payload';

@Resolver(() => CommentPayload)
export class CommentsFieldsResolver {
  @ResolveField(() => PostPayload)
  async post(
    @Parent() comment: CommentPayload,
    @Loader('PostsLoader') postsLoader: DataLoader<UUID, PostPayload>,
  ): Promise<PostPayload> {
    return postsLoader.load(comment.postId);
  }

  @ResolveField(() => Int)
  async likesCount(
    @Parent() comment: CommentPayload,
    @Loader('CommentLikesCountLoader')
    likesCountLoader: DataLoader<UUID, { count: number }>,
  ): Promise<number> {
    const { count } = await likesCountLoader.load(comment.id);
    return count;
  }

  @ResolveField(() => Int)
  async dislikesCount(
    @Parent() comment: CommentPayload,
    @Loader('CommentDislikesCountLoader')
    dislikesCountLoader: DataLoader<UUID, { count: number }>,
  ): Promise<number> {
    const { count } = await dislikesCountLoader.load(comment.id);
    return count;
  }

  @ResolveField(() => UserPayload)
  async author(
    @Parent() comment: CommentPayload,
    @Loader('AuthorsLoader') authorsLoader: DataLoader<UUID, UserPayload>,
  ): Promise<UserPayload> {
    return authorsLoader.load(comment.authorId);
  }
}
