import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationInfo } from '../../common/dto/pagination-info.payload';
import { CommentPayload } from './comment.payload';

@ObjectType()
export class PostCommentsPayload {
  @Field(() => [CommentPayload], { nullable: false })
  items: CommentPayload[];

  @Field(() => PaginationInfo, { nullable: false })
  pageInfo: PaginationInfo;
}
