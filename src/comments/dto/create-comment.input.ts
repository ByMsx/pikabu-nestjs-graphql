import { Field, InputType } from '@nestjs/graphql';
import { UUIDConstructor } from '../../common/types';

@InputType()
export class CreateCommentInput {
  @Field(() => UUIDConstructor)
  postId: string;

  @Field(() => String)
  text: string;
}
