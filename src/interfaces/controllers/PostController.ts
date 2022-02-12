/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { Request } from "express";

/* --- ユースケース ---------------------------------------------------------------------------------------------------- */
import { PostUseCase } from "../../application/usecases/PostUseCase";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { PostRepositoryImpl } from "../database/PostgreSQL/PostRepositoryImpl";

/* --- レスポンス ------------------------------------------------------------------------------------------------------ */
import { ApiResponse } from "../serializers/ApplicationSerializer";
import { PostResponse, PostSerializer } from "../serializers/PostSerializer";


class PostController {
  private useCase: PostUseCase;
  private serializer: PostSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new PostRepositoryImpl(prisma);

    this.useCase = new PostUseCase(repository);
    this.serializer = new PostSerializer();
  }


  /* --- idでの投稿取得 ------------------------------------------------------------------------------------------------ */
  public async find(request: Request): Promise<ApiResponse<PostResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const postId = Number(request.params.id);
      const post = await this.useCase.find(postId);
      const response = this.serializer.post(post);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}


export { PostController };
