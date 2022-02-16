import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  perPage: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}
