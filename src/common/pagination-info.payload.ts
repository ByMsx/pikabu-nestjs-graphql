import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field(() => Number)
  totalPages: number;

  @Field(() => Number)
  totalItems: number;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  perPage: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}
