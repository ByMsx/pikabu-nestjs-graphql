import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Number, { nullable: false })
  page: number;

  @Field(() => Number, { nullable: false })
  perPage: number;
}
