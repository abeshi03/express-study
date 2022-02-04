import { PrismaClient } from "@prisma/client";

import { UserRepository } from "../repository/UserRepository";
import { User, CreateUserPayload } from "../../../domain/User";
import { FindUserListParams } from "../../request/user/FindUserListRequest";


class UserRepositoryImpl implements UserRepository {
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
}


export { UserRepositoryImpl };
