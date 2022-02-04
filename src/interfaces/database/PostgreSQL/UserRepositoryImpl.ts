import { PrismaClient } from "@prisma/client";

import { IUserRepository } from "../repository/IUserRepository";
import { User, CreateUserPayload } from "../../../domain/User";
import { FindUserListParams } from "../../request/user/FindUserListRequest";


class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

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
      take: query.itemsCountPerPaginationPage,
      skip:
        (query.paginationPageNumber -1) * query.itemsCountPerPaginationPage
    });

    return users.map((user: CreateUserPayload) => new User(user));
  }

  public async totalItemsCount(): Promise<number> {
    return await this.prisma.user.count();
  }

  public async ItemsCountInSelection(query: FindUserListParams): Promise<number> {
    return await this.prisma.user.count({
      where: {
        name: {
          contains: query.searchByUserName
        }
      }
    });
  }
}


export { UserRepository };
