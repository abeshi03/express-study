import { Request } from "express";


export interface CreateUserParams {
  email: string;
  name: string;
  description: string;
  avatarUri: string;
}

export type CreateUserRequest = Request<CreateUserParams>;
