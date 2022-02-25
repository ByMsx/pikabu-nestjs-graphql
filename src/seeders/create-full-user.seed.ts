import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/models/post.entity';
import { Comment } from '../comments/models/comment.entity';
import { Like } from '../likes/models/like.entity';
import { Bookmark } from '../bookmarks/models/bookmark.entity';

export default class CreateFullUserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const user = await factory(User)().create();

    const posts = await factory(Post)()
      .map(async (post) => {
        post.author = user;
        return post;
      })
      .createMany(4);

    let comments: Comment[] = [];
    let likes: Like[] = [];
    let bookmarks: Bookmark[] = [];

    await Promise.all(
      posts.map(async (post) => {
        const postComments = await factory(Comment)()
          .map(async (comment) => {
            comment.post = post;
            return comment;
          })
          .createMany(10);

        comments = comments.concat(postComments);

        const postLikes = await factory(Like)()
          .map(async (like) => {
            like.post = post;
            like.comment = null;
            like.commentId = null;
            return like;
          })
          .createMany(10);

        likes = likes.concat(postLikes);

        const postBookmarks = await factory(Bookmark)()
          .map(async (bookmark) => {
            bookmark.post = post;
            bookmark.comment = null;
            bookmark.commentId = null;
            return bookmark;
          })
          .createMany(4);

        bookmarks = bookmarks.concat(postBookmarks);
      }),
    );

    await Promise.all(
      comments.map(async (comment) => {
        const commentLikes = await factory(Like)()
          .map(async (like) => {
            like.comment = comment;
            like.postId = null;
            like.post = null;
            return like;
          })
          .createMany(3);

        likes = likes.concat(commentLikes);

        const commentBookmarks = await factory(Bookmark)()
          .map(async (bookmark) => {
            bookmark.comment = comment;
            bookmark.post = null;
            bookmark.postId = null;
            return bookmark;
          })
          .createMany(2);

        bookmarks = bookmarks.concat(commentBookmarks);
      }),
    );
  }
}
