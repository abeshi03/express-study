import { Request } from "express";


export interface SignUpParams {
  email: string;
  password: string;
  name: string;
  description: string;
  avatarUri?: string;
}


export type SignUpRequest = Request<SignUpParams>;
