/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { CreatePostPayload, Post } from "../../../domain/Post";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { PostRepository } from "../repository/PostRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindPostListParams } from "../../request/post/FindPostListRequest";
import { FindPostParams } from "../../request/post/FindPostRequest";


class PostRepositoryImpl implements PostRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  public async findList(
    query: FindPostListParams = { limit: 5, pageNumber: 1 },
    userId?: number
  ): Promise<PostRepository.FindList> {
    const getPosts = await this.prisma.post.findMany({
      where: {
        content: {
          contains: query.searchByPostContent
        }
      },
      include: {
        user: true,
        like: true
      },
      orderBy: {
        id: "asc"
      },
      skip: (Number(query.pageNumber) - 1) * Number(query.limit),
      take: Number(query.limit)
    });

    const posts = getPosts.map((post: CreatePostPayload) => new Post(post));

    return {
      posts,
      userId
    }
  }


  public async find(query: FindPostParams): Promise<PostRepository.Find> {

    const post = await this.prisma.post.findUnique({
      where: {
        id: query.postId
      },
      include: {
        user: true,
        like: true,
      },
      rejectOnNotFound: true
    });

    const isPostToLikeByCurrentUser = (): boolean => {
      if (!query.userId) return false;

      return post.like.map((postLike) => {
        return postLike.userId;
      }).includes(query.userId)
    }

    return {
      post: new Post(post),
      isPostToLikeByCurrentUser: isPostToLikeByCurrentUser()
    }
  }
}

export { PostRepositoryImpl };
