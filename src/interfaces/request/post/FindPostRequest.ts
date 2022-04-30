import { Request } from "express";


export interface FindPostParams {
  postId: number;
  userId?: number
}


export type FindPostRequest = Request<FindPostParams>;
