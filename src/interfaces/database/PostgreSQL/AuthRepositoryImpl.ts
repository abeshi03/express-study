/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { User } from "../../../domain/User";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { AuthRepository } from "../repository/AuthRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { SignUpParams } from "../../request/auth/SignUpRequest";


class AuthRepositoryImpl implements AuthRepository {

  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  public async checkForUniqueEmail(email: string): Promise<boolean> {
    const users = await this.prisma.user.findMany();

    const userEmails: string[] = users.map((user) => {
      return user.email;
    })

    return userEmails.includes(email);
  }



  public async signUp(query: SignUpParams): Promise<User> {

    const hashedPassword = await bcrypt.hash(query.password, 10);

    const userId = (await this.prisma.user.create({
      data: {
        name: query.name,
        description: query.description,
        email: query.email,
        password: hashedPassword,
        createdAt: new Date()
      }
    })).id;

    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        description: true,
        email: true,
        avatarUri: true
      },
      where: {
        id: userId
      },
      rejectOnNotFound: true
    });

    return new User(user);

  }
}


export { AuthRepositoryImpl };