import { Request } from "express";
import { UserRole } from "../../../domain/User";


export interface CreateUserParams {
  email: string;
  name: string;
  description: string;
  avatarUri: string;
  role: UserRole;
}

export type CreateUserRequest = Request<CreateUserParams>;
