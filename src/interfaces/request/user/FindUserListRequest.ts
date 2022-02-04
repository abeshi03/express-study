import { Request } from "express";


export interface FindUserListParams {
  paginationPageNumber?: number;
  itemsCountPerPaginationPage?: number;
  searchUserName?: string;
}


export type TFindUserListRequest = Request<FindUserListParams>;
