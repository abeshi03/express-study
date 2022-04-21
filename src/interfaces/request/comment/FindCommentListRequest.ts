import { Request } from "express";


export interface FindCommentListParams {
  postId?: number;
  limit?: number;
  pageNumber?: number;
}


export type FindCommentListRequest = Request<FindCommentListParams>;
