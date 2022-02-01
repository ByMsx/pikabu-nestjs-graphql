import { Field, ObjectType } from '@nestjs/graphql';
import { PostPayload } from './post.payload';
import { PaginationInfo } from '../../../common/pagination-info.payload';

@ObjectType()
export class GetPostsPayload {
  @Field(() => [PostPayload])
  items: PostPayload[];

  @Field(() => PaginationInfo, { nullable: false })
  pageInfo: PaginationInfo;
}
