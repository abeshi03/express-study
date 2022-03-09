/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { User, CreateUserPayload } from "../../../domain/User";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { AuthRepository } from "../repository/AuthRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { SignUpParams } from "../../request/auth/SignUpRequest";


class AuthRepositoryImpl implements AuthRepository {

  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  public async signUp(query: SignUpParams): Promise<User> {

    // const userEmails: { email: string }[] = await this.prisma.user.findMany({
    //   select: {
    //     email: true
    //   }
    // });
    //
    // if(userEmails.includes({ email: query.email })) {
    //
    // }
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
