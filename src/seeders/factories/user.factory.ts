import { define } from 'typeorm-seeding';
import { User } from '../../users/user.entity';
import * as md5 from 'md5';

define(User, (faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.nickname = faker.name.firstName();
  user.passwordHash = md5(faker.internet.password());

  return user;
});
