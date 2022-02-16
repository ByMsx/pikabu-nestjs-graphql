import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpPayload {
  @Field()
  status: string; // TODO: fix
}
