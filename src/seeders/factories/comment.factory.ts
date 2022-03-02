import { define, factory } from 'typeorm-seeding';
import { Comment } from '../../comments/models/comment.entity';
import { Post } from '../../posts/models/post.entity';
import { User } from '../../users/user.entity';

define(Comment, (faker) => {
  const comment = new Comment();

  comment.post = factory(Post)() as any;
  comment.author = factory(User)() as any;
  comment.text = faker.lorem.text();

  return comment;
});
