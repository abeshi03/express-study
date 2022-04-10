/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

/* --- ユースケース ---------------------------------------------------------------------------------------------------- */
import { CommentUseCase } from "../../application/usecases/CommentUseCase";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { CommentRepositoryImpl } from "../database/PostgreSQL/CommentRepositoryImpl";

/* --- リクエスト------------------------------------------------------------------------------------------------------ */
import { FindCommentListRequest } from "../request/comment/FindCommentListRequest";

/* --- レスポンス------------------------------------------------------------------------------------------------------ */
import { ApiResponse } from "../serializers/ApplicationSerializer";
import { CommentSerializer, CommentsResponse } from "../serializers/CommentSerializer";


class CommentController {

  private useCase: CommentUseCase;
  private commentSerializer: CommentSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new CommentRepositoryImpl(prisma);
    this.useCase = new CommentUseCase(repository);
    this.commentSerializer = new CommentSerializer();
  }


  public async findList(request: FindCommentListRequest): Promise<ApiResponse<CommentsResponse>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {

      const comments = await this.useCase.findList(request.query);
      const response = await this.commentSerializer.comments(comments);

      return ApiResponse.success(response);

    } catch (error: any) {

      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}


export { CommentController };
