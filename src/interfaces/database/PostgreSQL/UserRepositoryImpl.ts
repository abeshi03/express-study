/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { User, CreateUserPayload } from "../../../domain/User";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { UserRepository } from "../repository/UserRepository";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindUserListParams } from "../../request/user/FindUserListRequest";


class UserRepositoryImpl implements UserRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  public async findList(query: FindUserListParams): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        email: true
      },
      where: {
        name: {
          contains: query.searchByUserName
        }
      },
      orderBy: {
        id: "asc"
      },
      take: Number(query.itemsCountPerPaginationPage),
      skip:
        (Number(query.paginationPageNumber) -1) * Number(query.itemsCountPerPaginationPage)
    });

    return users.map((user: CreateUserPayload) => new User(user));
  }

  public async totalItemsCount(): Promise<number> {
    return await this.prisma.user.count();
  }

  public async itemsCountInSelection(query: FindUserListParams): Promise<number> {
    return await this.prisma.user.count({
      where: {
        name: {
          contains: query.searchByUserName
        }
      }
    });
  }


  /* --- ユーザー取得 -------------------------------------------------------------------------------------------------- */
  public async find(targetUserId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        description: true,
        email: true
      },
      where: {
        id: targetUserId
      },
      rejectOnNotFound: true
    });

    return new User(user);
  }
}


export { UserRepositoryImpl };
