import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationInfo } from '../../common/dto/pagination-info.payload';
import { BookmarkPayload } from './bookmark.payload';

@ObjectType()
export class GetBookmarksPayload {
  @Field(() => [BookmarkPayload])
  items: typeof BookmarkPayload[];

  @Field(() => PaginationInfo, { nullable: false })
  pageInfo: PaginationInfo;
}
