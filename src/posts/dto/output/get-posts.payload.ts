import { Field, ObjectType } from '@nestjs/graphql';
import { PostPayload } from './post.payload';

@ObjectType()
export class GetPostsPayload {
  @Field(() => [PostPayload])
  items: PostPayload[];
}
