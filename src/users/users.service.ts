import { Injectable } from '@nestjs/common';
import { CreateUserData, UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly users: UsersRepository) {}

  async findByEmailAndPassword(email: string, password: string) {
    return this.users.findByEmailAndPassword(email, password);
  }

  async createOne(data: CreateUserData): Promise<User> {
    return this.users.createUser(data);
  }
}
