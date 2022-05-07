/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

import { LikeRepository } from "../repository/LikeRepository";


class LikeRepositoryImpl implements LikeRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  public async addLike(userId: number, postId: number): Promise<void> {
    await this.prisma.like.create({
      data: {
        userId,
        postId,
        createdAt: new Date()
      }
    });
  }

  public async removeLike(userId: number, postId: number): Promise<void> {
    await this.prisma.like.delete({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    });
  }
}


export { LikeRepositoryImpl };
