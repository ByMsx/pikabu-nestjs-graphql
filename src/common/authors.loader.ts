import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { UUID } from './types';
import { UserPayload } from '../auth/dto/user.payload';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthorsLoader extends OrderedNestDataLoader<UUID, UserPayload> {
  constructor(private readonly repo: UsersRepository) {
    super();
  }

  getOptions = () => ({
    propertyKey: 'id',
    query: (ids: UUID[]) => this.repo.findByIds(ids),
  });
}
