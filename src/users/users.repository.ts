import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as md5 from 'md5';

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
}
