import { Request } from "express";


/* itemsCountPerPaginationPage, paginationPageNumberは0より大きい整数 */
export interface FindUserListParams {
  paginationPageNumber?: number;
  itemsCountPerPaginationPage?: number;
  searchByUserName?: string;
}


export type FindUserListRequest = Request<FindUserListParams>;
