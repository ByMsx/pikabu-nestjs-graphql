import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostPayload } from '../dto/output/post.payload';
import { PostsService } from '../posts.service';
import { GetPostsPayload } from '../dto/output/get-posts.payload';
import { GetPostsInput } from '../dto/input/get-posts.input';
import { UUID } from '../../common/types';

@Resolver(() => PostPayload)
export class PostsQueryResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => GetPostsPayload, { name: 'posts' })
  async posts(
    @Args('postsData') postsData: GetPostsInput,
  ): Promise<GetPostsPayload> {
    return this.postsService.getPosts(postsData);
  }

  @Query(() => PostPayload, { name: 'post' })
  async post(@Args('id') id: UUID): Promise<PostPayload> {
    return this.postsService.getPost(id);
  }
}
