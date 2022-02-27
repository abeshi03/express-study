/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { CreatePostPayload, Post } from "../../../domain/Post";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { PostRepository } from "../repository/PostRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindPostListParams } from "../../request/post/FindPostListRequest";


class PostRepositoryImpl implements PostRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  public async findList(query: FindPostListParams): Promise<PostRepository.FindList.ResponseData> {
    const posts = await this.prisma.post.findMany({
      where: {
        content: {
          contains: query.searchByPostContent
        }
      },
      include: {
        user: true
      },
      orderBy: {
        id: "asc"
      },
      skip: (Number(query.pageNumber) - 1) * Number(query.limit),
      take: Number(query.limit)
    });

    return {
      posts: posts.map((post: CreatePostPayload) => new Post(post))
    }

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

export { PostRepositoryImpl };
