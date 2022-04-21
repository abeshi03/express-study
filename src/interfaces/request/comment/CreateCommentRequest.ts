import { Request } from "express";


export interface CreateCommentParams {
  text: string;
}


export type CreateCommentRequest = Request<CreateCommentParams>;
