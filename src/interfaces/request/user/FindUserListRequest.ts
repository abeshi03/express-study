import { Request } from "express";
import { UserRole } from "../../../domain/User";


/* itemsCountPerPaginationPage, paginationPageNumberは0より大きい整数 */
export interface FindUserListParams {
  paginationPageNumber?: number;
  itemsCountPerPaginationPage?: number;
  searchByUserName?: string;
  role?: UserRole;
}


export type FindUserListRequest = Request<FindUserListParams>;
