import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: false })
  page: number;

  @Field(() => Int, { nullable: false })
  perPage: number;
}
