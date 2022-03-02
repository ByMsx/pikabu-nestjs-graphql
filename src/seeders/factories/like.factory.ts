import { define, factory } from 'typeorm-seeding';
import { Like } from '../../likes/models/like.entity';
import { User } from '../../users/user.entity';
import { Post } from '../../posts/models/post.entity';
import { Comment } from '../../comments/models/comment.entity';

define(Like, (faker) => {
  const like = new Like();

  const isPositiveLike = faker.random.boolean();
  const isPostLike = faker.random.boolean();

  like.user = factory(User)() as any;
  like.rating = isPositiveLike ? 1 : -1;
  if (isPostLike) {
    like.post = factory(Post)() as any;
  } else {
    like.comment = factory(Comment)() as any;
  }

  return like;
});
