import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletePostsPayload {
  @Field()
  success: boolean;

  @Field(() => Number, { nullable: true })
  affectedRows?: number;

  @Field(() => String, { nullable: true })
  error?: string; // TODO: specify type
}
