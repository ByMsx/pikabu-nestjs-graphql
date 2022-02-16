import {
  Field,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { UUID, UUIDConstructor } from '../types';

export enum MutationStatus {
  SUCCESS = 'success',
  FAIL = 'failed',
}

@ObjectType()
export class MutationError {
  @Field(() => String)
  public message: string;

  constructor(msg: string) {
    this.message = msg;
  }
}

registerEnumType(MutationStatus, {
  name: 'MutationStatus',
});

@InterfaceType()
export abstract class MutationPayload<T> {
  @Field(() => MutationStatus)
  status: MutationStatus;

  @Field(() => UUIDConstructor, { nullable: true })
  recordID?: UUID;

  @Field(() => MutationError, { nullable: true })
  error?: MutationError;

  abstract record?: T;
}
