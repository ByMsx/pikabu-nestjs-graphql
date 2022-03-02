import { Field, ObjectType } from '@nestjs/graphql';
import { MutationPayload } from '../../common/dto/mutation.payload';
import { UserPayload } from './user.payload';

@ObjectType({ implements: [MutationPayload] })
export class SignUpPayload extends MutationPayload<UserPayload> {
  @Field(() => UserPayload)
  record?: UserPayload;
}
