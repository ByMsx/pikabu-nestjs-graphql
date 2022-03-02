import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MutationError } from '../../../common/dto/mutation.payload';

@ObjectType()
export class DeletePostsPayload {
  @Field()
  success: boolean;

  @Field(() => Int, { nullable: true })
  affectedRows?: number;

  @Field(() => String, { nullable: true })
  error?: MutationError;
}
