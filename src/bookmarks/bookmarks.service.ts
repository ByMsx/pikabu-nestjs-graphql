import { Injectable } from '@nestjs/common';
import { BookmarksRepository } from './bookmarks.repository';
import { UUID } from '../common/types';
import {
  BookmarkPayload,
  CommentBookmarkPayload,
  PostBookmarkPayload,
} from './dto/bookmark.payload';
import { plainToInstance } from 'class-transformer';
import { BookmarkType, GetBookmarksInput } from './dto/get-bookmarks.input';
import { FindManyOptions } from 'typeorm';
import { Bookmark } from './models/bookmark.entity';
import { PaginationService } from '../common/pagination-service.class';
import { GetBookmarksPayload } from './dto/get-bookmarks.payload';
import { CreateCommentBookmarkPayload } from './dto/create-comment-bookmark.payload';
import { MutationStatus } from '../common/dto/mutation.payload';

@Injectable()
export class BookmarksService extends PaginationService {
  constructor(private repo: BookmarksRepository) {
    super();
  }

  async getBookmarks(
    input: GetBookmarksInput,
    userId: UUID,
  ): Promise<GetBookmarksPayload> {
    const options: FindManyOptions<Bookmark> = {};
    const { skip, limit: take } = this.getSkipLimit(input);
    options.skip = skip;
    options.take = take;
    options.where = { userId };

    if (input.type) {
      if (input.type === BookmarkType.COMMENT) {
        options.where.commentId = null;
      } else if (input.type === BookmarkType.POST) {
        options.where.postId = null;
      }
    }

    const [items, count] = await this.repo.findAndCount(options);
    const pageInfo = this.getPageInfo(input.page, input.perPage, count);

    return {
      pageInfo,
      items: items.map((item) => {
        const cl = item.commentId
          ? CommentBookmarkPayload
          : PostBookmarkPayload;
        return plainToInstance<
          CommentBookmarkPayload | PostBookmarkPayload,
          Bookmark
        >(cl, item);
      }),
    };
  }

  async createCommentBookmark(
    commentId: UUID,
    userId: UUID,
  ): Promise<CreateCommentBookmarkPayload> {
    try {
      const instance = this.repo.create({
        commentId,
        userId,
      });

      await this.repo.save(instance);
      const record = plainToInstance(CommentBookmarkPayload, instance);
      return {
        recordID: record.id,
        record,
        status: MutationStatus.SUCCESS,
      };
    } catch (e) {
      return {
        status: MutationStatus.FAIL,
        error: {
          message: e.message,
        },
      };
    }
  }

  async createPostBookmark(
    postId: UUID,
    userId: UUID,
  ): Promise<typeof BookmarkPayload> {
    const instance = this.repo.create({
      postId,
      userId,
    });

    await this.repo.save(instance);
    return plainToInstance(PostBookmarkPayload, instance);
  }
}
