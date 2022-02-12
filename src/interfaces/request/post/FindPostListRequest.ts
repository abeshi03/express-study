import { Request } from "express";


export interface FindPostListParams {
  limit?: number;
  cursor?: number;
  searchByPostContent?: string;
}


export type FindPostListRequest = Request<FindPostListParams>;
