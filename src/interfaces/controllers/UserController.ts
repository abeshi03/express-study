import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { ApiResponse } from "../serializers/ApplicationSerializer";

import { UserUseCase } from "../../application/usecases/UserUseCase";
import { UserRepository } from "../database/PostgreSQL/UserRepositoryImpl";
import { UserSerializer, UsersResponse } from "../serializers/UserSerializer";
import { FindUserListRequest } from "../request/user/FindUserListRequest";

class UserController {
  private useCase: UserUseCase;
  private serializer: UserSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new UserRepository(prisma);
    this.useCase = new UserUseCase(repository);

    this.serializer = new UserSerializer();
  }

  public async findList(request: FindUserListRequest): Promise<ApiResponse<UsersResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg)
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
}

export { UserController };
