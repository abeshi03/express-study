import { Request } from "express";


export interface FindPostListParams {
  limit?: number;
  cursor?: string;
  searchByPostContent?: string;
}


export type FindPostListRequest = Request<FindPostListParams>;
