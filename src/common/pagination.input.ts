import { Field } from '@nestjs/graphql';

export class PaginationInput {
  @Field(() => Number, { nullable: false })
  page: number;

  @Field(() => Number, { nullable: false })
  perPage: number;
}
