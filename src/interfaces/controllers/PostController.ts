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
import { PostResponse, PostSerializer, PostsResponse } from "../serializers/PostSerializer";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindPostListRequest } from "../request/post/FindPostListRequest";


class PostController {
  private useCase: PostUseCase;
  private serializer: PostSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new PostRepositoryImpl(prisma);

    this.useCase = new PostUseCase(repository);
    this.serializer = new PostSerializer();
  }


  /* --- 投稿一覧取得 -------------------------------------------------------------------------------------------------- */
  public async findList(request: FindPostListRequest, userId?: number): Promise<ApiResponse<PostsResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const posts = await this.useCase.findList(request.query, userId ?? 1);
      const response = this.serializer.posts(posts);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }


  /* --- idでの投稿取得 ------------------------------------------------------------------------------------------------ */
  public async find(request: Request, userId?: number): Promise<ApiResponse<PostResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const postId = Number(request.params.id);
      const post = await this.useCase.find({
        userId: userId ?? 1,
        postId
      })
      const response = this.serializer.post(post);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}


export { PostController };
