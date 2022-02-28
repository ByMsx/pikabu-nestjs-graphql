import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as md5 from 'md5';

export interface CreateUserData {
  nickname: User['nickname'];
  email: User['email'];
  password: string;
}

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private static hashPassword(password: string): string {
    return md5(password);
  }

  findByEmailAndPassword(email: string, password: string) {
    const passwordHash = UsersRepository.hashPassword(password);
    return this.findOne({
      email,
      passwordHash,
    });
  }

  async createUser(data: CreateUserData): Promise<User> {
    const user = this.create();
    user.email = data.email;
    user.passwordHash = UsersRepository.hashPassword(data.password);
    user.nickname = data.nickname;

    await this.save(user);
    return user;
  }
}
