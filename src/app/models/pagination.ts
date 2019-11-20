export interface Pagination {
    currentPage: number;
    itemsPerPage: number; // Page Size
    totalItems: number;
    totalPages: number;
}

export class PaginationResult<T> {
    result: T;
    pagination: Pagination;
}
