import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly users: UsersRepository) {}

  async findByEmailAndPassword(email: string, password: string) {
    return this.users.findByEmailAndPassword(email, password);
  }
}
