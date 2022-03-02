import { PostPayload } from '../dto/output/post.payload';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from '../dto/input/create-post.input';
import { UpdatePostInput } from '../dto/input/update-post.input';
import { DeletePostsPayload } from '../dto/output/delete-posts.payload';
import { DeletePostsInput } from '../dto/input/delete-posts.input';
import { RequestUser } from '../../common/types';
import { PostsService } from '../posts.service';
import { CurrentUser } from '../../auth/current-user.decorator';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { IsPostsOwnerGuard } from '../is-posts-owner.guard';
import { UserPayload } from '../../auth/dto/user.payload';
import { CreatePostPayload } from '../dto/output/create-post.payload';
import { UpdatePostPayload } from '../dto/output/update-post.payload';
import { LikePostPayload } from '../dto/output/like-post.payload';
import { LikePostInput } from '../dto/input/like-post.input';

@Resolver(() => PostPayload)
@UseGuards(GqlAuthGuard)
export class PostsMutationResolver {
  constructor(private postsService: PostsService) {}

  @Mutation(() => CreatePostPayload)
  async createPost(
    @Args('newPostData') newPostData: CreatePostInput,
    @CurrentUser() user: UserPayload,
  ): Promise<CreatePostPayload> {
    return this.postsService.createPost(newPostData, user.id);
  }

  @Mutation(() => UpdatePostPayload)
  @UseGuards(IsPostsOwnerGuard)
  @SetMetadata('postIdPath', 'updatePostData.id')
  async updatePost(
    @Args('updatePostData') updatePostData: UpdatePostInput,
  ): Promise<UpdatePostPayload> {
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

  @Mutation(() => LikePostPayload)
  async likePost(
    @Args('postData') postData: LikePostInput,
    @CurrentUser() user: RequestUser,
  ): Promise<LikePostPayload> {
    return this.postsService.likePost(postData, user.id);
  }

  @Mutation(() => LikePostPayload)
  async dislikePost(
    @Args('postData') postData: LikePostInput,
    @CurrentUser() user: RequestUser,
  ): Promise<LikePostPayload> {
    return this.postsService.dislikePost(postData, user.id);
  }
}
