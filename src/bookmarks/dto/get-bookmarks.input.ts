import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { PaginationInput } from '../../common/dto/pagination.input';

export enum BookmarkType {
  POST = 'posts',
  COMMENT = 'comments',
}

registerEnumType(BookmarkType, { name: 'BookmarkType' });

@InputType()
export class GetBookmarksInput extends PaginationInput {
  @Field(() => BookmarkType, { nullable: true })
  type?: BookmarkType;
}
