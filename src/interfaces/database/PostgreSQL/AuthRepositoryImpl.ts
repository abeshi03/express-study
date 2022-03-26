/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { User } from "../../../domain/User";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { AuthRepository } from "../repository/AuthRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { SignUpParams } from "../../request/auth/SignUpRequest";
import { SignInParams } from "../../request/auth/SignInRequest";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { isNotNull } from "../../../utility/typeGuards/isNotNull";


class AuthRepositoryImpl implements AuthRepository {

  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }


  public async checkForUniqueEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    return isNotNull(user);
  }



  public async signUp(query: SignUpParams): Promise<User> {

    const hashedPassword = await bcrypt.hash(query.password, 10);

    const [ user, createUser ] = await this.prisma.$transaction([
      this.prisma.user.findFirst({
        where: {
          email: query.email
        }
      }),
      this.prisma.user.create({
        data: {
          name: query.name,
          description: query.description,
          email: query.email,
          password: hashedPassword,
          createdAt: new Date()
        }
      })
    ]);

    if (user) {
      throw new Error("email is unique");
    }

    return new User(createUser);
  }


  public async signIn(query: SignInParams): Promise<User> {

    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        description: true,
        email: true,
        avatarUri: true,
        password: true
      },
      where: {
        email: query.email
      },
      rejectOnNotFound: true
    });

    if (!user) {
      throw new Error("Invalid email");
    }

    const comparedPassword: boolean = await bcrypt.compare(query.password, user.password);

    if (!comparedPassword) {
      throw new Error("Invalid password");
    }

    return new User(user);
  }


}


export { AuthRepositoryImpl };
