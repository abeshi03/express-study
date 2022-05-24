import { Request } from "express";
import { UserRole } from "../../../domain/User";

export interface UpdateUserParams {
  id: number;
  email: string;
  name: string;
  description: string;
  role: UserRole;
  avatarUri: string;
}

export type UpdateUserRequest = Request<UpdateUserParams>;
