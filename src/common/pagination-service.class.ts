import { PaginationInfo } from './dto/pagination-info.payload';
import { PaginationInput } from './dto/pagination.input';

export abstract class PaginationService {
  protected getPageInfo(
    page: number,
    perPage: number,
    totalItems: number,
  ): PaginationInfo {
    const totalPages = Math.ceil(totalItems / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      page,
      perPage,
      totalPages,
      totalItems,
      hasNextPage,
      hasPreviousPage,
    };
  }

  protected getSkipLimit(postsData: PaginationInput) {
    const { perPage, page } = postsData;
    const limit = perPage;
    const skip = (page - 1) * limit;

    return { limit, skip };
  }
}
