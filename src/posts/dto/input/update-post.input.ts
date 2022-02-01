import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';
import { UUID, UUIDConstructor } from '../../../common/types';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => UUIDConstructor)
  id: UUID;
}
