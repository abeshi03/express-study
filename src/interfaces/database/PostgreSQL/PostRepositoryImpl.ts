/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../domain/Post";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { PostRepository } from "../repository/PostRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
// import { FindPostListParams } from "../../request/post/FindPostListRequest";


class PostRepositoryImpl implements PostRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  public async find(targetPostId: number): Promise<Post> {

    const post = await this.prisma.post.findUnique({
      where: {
        id: targetPostId
      },
      include: {
        user: true
      },
      rejectOnNotFound: true
    });


    return new Post(post);
  }
}
