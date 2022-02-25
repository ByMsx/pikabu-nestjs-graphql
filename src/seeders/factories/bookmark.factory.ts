import { Bookmark } from '../../bookmarks/models/bookmark.entity';
import { define, factory } from 'typeorm-seeding';
import { User } from '../../users/user.entity';
import { Post } from '../../posts/models/post.entity';
import { Comment } from '../../comments/models/comment.entity';

define(Bookmark, (faker) => {
  const bm = new Bookmark();

  bm.user = factory(User)() as any;
  const isPostBookmark = faker.random.boolean();
  if (isPostBookmark) {
    bm.post = factory(Post)() as any;
  } else {
    bm.comment = factory(Comment)() as any;
  }

  return bm;
});
