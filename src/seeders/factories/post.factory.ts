import { define, factory } from 'typeorm-seeding';
import { Post } from '../../posts/models/post.entity';
import { User } from '../../users/user.entity';

define(Post, (faker) => {
  const post = new Post();
  post.author = factory(User)() as any;
  post.text = faker.lorem.text();
  post.tags = faker.random.words(3).split(' ');
  post.imagesHrefs = [
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
  ];
  post.title = faker.lorem.sentence();

  return post;
});
