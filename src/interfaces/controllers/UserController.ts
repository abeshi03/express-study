/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { Request } from "express";

/* --- ユースケース ---------------------------------------------------------------------------------------------------- */
import { UserUseCase } from "../../application/usecases/UserUseCase";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { UserRepositoryImpl } from "../database/PostgreSQL/UserRepositoryImpl";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindUserListRequest } from "../request/user/FindUserListRequest";

/* --- レスポンス ----------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../serializers/ApplicationSerializer";
import {
  IdResponse,
  UserResponse,
  UserSerializer,
  UsersResponse
} from "../serializers/UserSerializer";
import { UpdateUserRequest } from "../request/user/UpdateUserRequest";
import { CreateUserRequest } from "../request/user/CreateUserRequest";


class UserController {
  private useCase: UserUseCase;
  private serializer: UserSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new UserRepositoryImpl(prisma);
    this.useCase = new UserUseCase(repository);

    this.serializer = new UserSerializer();
  }


  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  public async findList(request: FindUserListRequest): Promise<ApiResponse<UsersResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const users = await this.useCase.findList(request.query);
      const totalItemsCount = await this.useCase.totalItemsCount();
      const itemsCountInSelection = await this.useCase.itemsCountInSelection(request.query);
      const response = this.serializer.users(users, totalItemsCount, itemsCountInSelection);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }


  /* --- idでのユーザー取得 --------------------------------------------------------------------------------------------- */
  public async find(request: Request): Promise<ApiResponse<UserResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const userId = Number(request.params.id);
      const user = await this.useCase.find(userId);
      const response = this.serializer.user(user);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }


  /* --- ユーザー追加 -------------------------------------------------------------------------------------------------- */
  public async create(request: CreateUserRequest): Promise<ApiResponse<IdResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const id = await this.useCase.create(request.body);
      const response = this.serializer.id(id);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }


  /* --- ユーザー更新 -------------------------------------------------------------------------------------------------- */
  public async update(request: UpdateUserRequest): Promise<ApiResponse<null>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const userId = Number(request.params.id)

      await this.useCase.update(userId, request.body);

      return ApiResponse.success(null);

    } catch (error: any) {

      if (error.message === "User not found") {
        return ApiResponse.error(404, error.message);
      }

      console.log(error);
      return ApiResponse.error(500, error.message);
    }

  }


  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  public async delete(request: Request): Promise<ApiResponse<null>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const userId = Number(request.params.id);
      await this.useCase.delete(userId);

      return ApiResponse.success(null);

    } catch (error: any) {

      if (error.message === "User not found") {
        return ApiResponse.error(404, error.message);
      }

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}

export { UserController };
