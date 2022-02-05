import { Request } from "express";

export interface UpdateUserParams {
  id: number;
  email: string;
  name: string;
  description: string;
}

export type UpdateUserRequest = Request<UpdateUserParams>;
