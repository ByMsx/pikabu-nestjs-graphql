import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from '../../../common/pagination.input';
import { PostCategory } from './get-posts.input';

@InputType()
export class PostCategoryInput extends PaginationInput {
  @Field()
  category: PostCategory;
}
