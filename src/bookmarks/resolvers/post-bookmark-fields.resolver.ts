import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostBookmarkPayload } from '../dto/bookmark.payload';
import { PostPayload } from '../../posts/dto/output/post.payload';
import { Loader } from 'nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { UUID } from '../../common/types';

@Resolver(() => PostBookmarkPayload)
export class PostBookmarkFieldsResolver {
  @ResolveField('post', () => PostPayload, { nullable: true })
  async post(
    @Parent() postBookmark: PostBookmarkPayload,
    @Loader('PostsLoader') postsLoader: DataLoader<UUID, PostPayload>,
  ): Promise<PostPayload> {
    if (!postBookmark.postId) return null;
    return postsLoader.load(postBookmark.postId);
  }
}
