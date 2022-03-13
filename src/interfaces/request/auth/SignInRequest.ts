import { Request } from "express";

export interface SignInParams {
  email: string;
  password: string;
}


export type SignInRequest = Request<SignInParams>;
