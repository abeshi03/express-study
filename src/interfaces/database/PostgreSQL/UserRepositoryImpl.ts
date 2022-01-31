import { PrismaClient } from "@prisma/client";

import { IUserRepository } from "../repository/IUserRepository";
import { User, CreateUserPayload } from "../../../domain/User";


class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findList(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user: CreateUserPayload) => new User(user));
  }
}


export { UserRepository };
