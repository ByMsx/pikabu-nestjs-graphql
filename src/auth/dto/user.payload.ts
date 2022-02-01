import { Field, ObjectType } from '@nestjs/graphql';
import { UUID, UUIDConstructor } from '../../common/types';
import { Exclude } from 'class-transformer';

@ObjectType()
export class UserPayload {
  @Field(() => UUIDConstructor)
  id: UUID;

  @Field(() => String)
  nickname: string;

  @Exclude()
  email: string;

  @Exclude()
  passwordHash: string;
}
