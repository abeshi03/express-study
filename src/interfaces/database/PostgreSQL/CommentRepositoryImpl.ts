/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Comment, CreateCommentPayload } from "../../../domain/Comment";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { CommentRepository } from "../repository/CommentRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindCommentListParams } from "../../request/comment/FindCommentListRequest";
import { CreateCommentParams } from "../../request/comment/CreateCommentRequest";


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

    const totalItemsCount = await this.prisma.comment.count({
      where: {
        postId: postId
      },
    });

    return {
      postComments: comments.map((comment: CreateCommentPayload) => new Comment(comment)),
      totalItemsCount
    }
  }

  public async create(
    query: CreateCommentParams,
    userId: number,
    postId: number
  ): Promise<number> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true
      },
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new Error("User not found")
    }

    const post = await this.prisma.post.findUnique({
      select: {
        id: true
      },
      where: {
        id: postId
      }
    });

    if (!post) {
      throw new Error("Post not found")
    }

    const comment = await this.prisma.comment.create({
      data: {
        userId: user.id,
        postId: post.id,
        text: query.text,
        createdAt: new Date()
      }
    });

    return comment.id;
  }
}


export { CommentRepositoryImpl };
