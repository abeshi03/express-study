import { Request } from "express";


export interface FindPostListParams {
  limit?: number;
  pageNumber?: number;
  searchByPostContent?: string;
}


export type FindPostListRequest = Request<FindPostListParams>;
