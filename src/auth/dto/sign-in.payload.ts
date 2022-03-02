import { Field, ObjectType } from '@nestjs/graphql';
import { UserPayload } from './user.payload';

@ObjectType()
export class SignInPayload {
  @Field(() => String)
  token: string;

  @Field(() => UserPayload, { nullable: false })
  user: UserPayload;
}
