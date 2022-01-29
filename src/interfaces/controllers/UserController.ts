import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "../serializers/ApplicationSerializer";

import { UserUseCase } from "../../application/usecases/UserUseCase";
import { UserRepository } from "../database/PostgreSQL/UserRepositoryImpl";
import { UserSerializer, UserResponse } from "../serializers/UserSerializer";

class UserController {
  private useCase: UserUseCase;
  private serializer: UserSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new UserRepository(prisma);
    this.useCase = new UserUseCase(repository);

    this.serializer = new UserSerializer();
  }

  public async findList(): Promise<ApiResponse<UserResponse[]>> {
    try {
      const users = await this.useCase.findList();
      const response = this.serializer.users(users);

      return ApiResponse.success(response);
    } catch (error: any) {

      return ApiResponse.error(500, error.message);
    }
  }
}

export { UserController };
