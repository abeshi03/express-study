/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { User, CreateUserPayload } from "../../../domain/User";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { UserRepository } from "../repository/UserRepository";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindUserListParams } from "../../request/user/FindUserListRequest";
import { UpdateUserParams } from "../../request/user/UpdateUserRequest";
import { CreateUserParams } from "../../request/user/CreateUserRequest";


class UserRepositoryImpl implements UserRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  public async findList(query: FindUserListParams): Promise<UserRepository.FindList.ResponseData> {

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        email: true,
        avatarUri: true
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

    users.map((user: CreateUserPayload) => new User(user));
    const totalItemsCount = await this.prisma.user.count();
    const itemsCountInSelection = await this.prisma.user.count({
      where: {
        name: {
          contains: query.searchByUserName
        }
      }
    });

    return {
      users: users.map((user: CreateUserPayload) => new User(user)),
      totalItemsCount,
      itemsCountInSelection
    }

  }


  /* --- ユーザー取得 -------------------------------------------------------------------------------------------------- */
  public async find(targetUserId: number): Promise<User> {

    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        description: true,
        email: true,
        avatarUri: true
      },
      where: {
        id: targetUserId
      },
      rejectOnNotFound: true
    });

    return new User(user);
  }


  /* --- ユーザー追加 -------------------------------------------------------------------------------------------------- */
  public async create(query: CreateUserParams): Promise<number> {

    const user = await this.prisma.user.create({
      data: {
        name: query.name,
        description: query.description,
        email: query.email,
        createdAt: new Date()
      }
    });

    return user.id;
  }


  /* --- ユーザー更新 -------------------------------------------------------------------------------------------------- */
  public async update(targetUserId: number, query: UpdateUserParams): Promise<void> {

    const user = await this.prisma.user.findUnique({
      where: {
        id: targetUserId
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.prisma.user.update({
      where: {
        id: targetUserId
      },
      data: {
        id: query.id,
        name: query.name,
        email: query.email,
        description: query.description,
        avatarUri: query.avatarUri
      }
    });
  }


  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  public async delete(targetUserId: number): Promise<void> {

    const user = await this.prisma.user.findUnique({
      where: {
        id: targetUserId
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.prisma.user.delete({
      where: {
        id: targetUserId
      }
    });
  }

}


export { UserRepositoryImpl };
