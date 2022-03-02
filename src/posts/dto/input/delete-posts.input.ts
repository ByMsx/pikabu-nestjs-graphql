import { Field, InputType } from '@nestjs/graphql';
import { UUID, UUIDConstructor } from '../../../common/types';

@InputType()
export class DeletePostsInput {
  @Field(() => [UUIDConstructor])
  postIds: UUID[];
}
