import { PostPayload } from '../dto/output/post.payload';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from '../dto/input/create-post.input';
import { UpdatePostInput } from '../dto/input/update-post.input';
import { DeletePostsPayload } from '../dto/output/delete-posts.payload';
import { DeletePostsInput } from '../dto/input/delete-posts.input';
import { RequestUser, UUID } from '../../common/types';
import { PostsService } from '../posts.service';
import { LikesService } from '../../likes/likes.service';
import { CurrentUser } from '../../auth/current-user.decorator';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { IsPostsOwnerGuard } from '../is-posts-owner.guard';
import { UserPayload } from '../../auth/dto/user.payload';

@Resolver(() => PostPayload)
@UseGuards(GqlAuthGuard)
export class PostsMutationResolver {
  constructor(
    private postsService: PostsService,
    private likesService: LikesService,
  ) {}

  @Mutation(() => PostPayload)
  async createPost(
    @Args('newPostData') newPostData: CreatePostInput,
    @CurrentUser() user: UserPayload,
  ): Promise<PostPayload> {
    return this.postsService.createPost(newPostData, user.id);
  }

  @Mutation(() => PostPayload)
  // @UseGuards(IsPostOwnerGuard) // TODO:!
  async updatePost(
    @Args('updatePostData') updatePostData: UpdatePostInput,
  ): Promise<PostPayload> {
    return this.postsService.updatePost(updatePostData);
  }

  @Mutation(() => DeletePostsPayload)
  @UseGuards(IsPostsOwnerGuard)
  @SetMetadata('postIdPath', 'deletePostsData.postsIds')
  async deletePost(
    @Args('deletePostsData') input: DeletePostsInput,
  ): Promise<DeletePostsPayload> {
    return this.postsService.removePost(input.postIds);
  }

  @Mutation(() => PostPayload)
  async likePost(
    @Args('postId') postId: UUID,
    @CurrentUser() user: RequestUser,
  ): Promise<PostPayload> {
    await this.likesService.createLike('post', postId, user.id, 1); // можно и через реляции, но тогда будет дубляж кода
    return this.postsService.getPost(postId);
  }

  @Mutation(() => PostPayload)
  async dislikePost(
    @Args('postId') postId: UUID,
    @CurrentUser() user: RequestUser,
  ): Promise<PostPayload> {
    await this.likesService.createLike('post', postId, user.id, -1); // можно и через реляции, но тогда будет дубляж кода
    return this.postsService.getPost(postId);
  }
}
