/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { Request } from "express";

/* --- ユースケース ---------------------------------------------------------------------------------------------------- */
import { LikeUseCase } from "../../application/usecases/LikeUseCase";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { LikeRepositoryImpl } from "../database/PostgreSQL/LikeRepositoryImpl";

/* --- レスポンス ------------------------------------------------------------------------------------------------------ */
import { ApiResponse } from "../serializers/ApplicationSerializer";


class LikeController {
  private useCase: LikeUseCase;

  public constructor(prisma: PrismaClient) {
    const repository = new LikeRepositoryImpl(prisma);
    this.useCase = new LikeUseCase(repository);
  }


  public async addLike(
    request: Request,
    userId?: number
  ): Promise<ApiResponse<null>> {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {
      const postId = Number(request.params.id);
      await this.useCase.addLike(userId ?? 1, postId);
      return ApiResponse.success(null);
    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }

  public async removeLike(
    request: Request,
    userId?: number
  ): Promise<ApiResponse<null>> {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {
      const postId = Number(request.params.id);
      await this.useCase.removeLike(userId ?? 1, postId);
      return ApiResponse.success(null);
    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}


export { LikeController };

