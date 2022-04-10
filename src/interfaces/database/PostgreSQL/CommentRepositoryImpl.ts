/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Comment, CreateCommentPayload } from "../../../domain/Comment";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { CommentRepository } from "../repository/CommentRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindCommentListParams } from "../../request/comment/FindCommentListRequest";


class CommentRepositoryImpl implements CommentRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findList(
    query: FindCommentListParams = { limit: 15, pageNumber: 1 },
    postId: number
  ): Promise<CommentRepository.FindList.ResponseData> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId: postId
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "asc"
      },
      skip: (Number(query.pageNumber) - 1) * Number(query.limit),
      take: Number(query.limit)
    });

    return {
      postComments: comments.map((comment: CreateCommentPayload) => new Comment(comment)),
      totalItemsCount: comments.length
    }
  }
}


export { CommentRepositoryImpl };
