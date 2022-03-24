/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { Request } from "express";

/* --- ユースケース ---------------------------------------------------------------------------------------------------- */
import { AuthUseCase } from "../../application/usecases/AuthUseCase";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { AuthRepositoryImpl } from "../database/PostgreSQL/AuthRepositoryImpl";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { SignUpRequest } from "../request/auth/SignUpRequest";
import { SignInRequest } from "../request/auth/SignInRequest";

/* --- レスポンス ----------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../serializers/ApplicationSerializer";
import { UserResponse, UserSerializer } from "../serializers/UserSerializer";


class AuthController {
  private useCase: AuthUseCase;
  private userSerializer: UserSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new AuthRepositoryImpl(prisma);
    this.useCase = new AuthUseCase(repository);

    this.userSerializer = new UserSerializer();
  }

  /* --- メール重複チェック --------------------------------------------------------------------------------------------- */
  public async checkForUniqueEmail(request: Request): Promise<ApiResponse<boolean>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const isUnique: boolean = await this.useCase.checkForUniqueEmail(request.body.email);

      return ApiResponse.success(isUnique);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }


  /* --- 会員登録 ----------------------------------------------------------------------------------------------------- */
  public async signUp(request: SignUpRequest): Promise<ApiResponse<UserResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const isEmailUnique: boolean = await this.useCase.checkForUniqueEmail(request.body.email);

      if (isEmailUnique) {
        return ApiResponse.error(400, "Not unique email");
      }

      const user = await this.useCase.signUp(request.body);
      const response = this.userSerializer.user(user);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }


  /* --- ログイン ----------------------------------------------------------------------------------------------------- */
  public async signIn(request: SignInRequest): Promise<ApiResponse<UserResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const user = await this.useCase.signIn(request.body);
      const response = this.userSerializer.user(user);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}


export { AuthController };
