import { User } from "../../../domain/User";

abstract class IUserRepository {
  abstract findList(): Promise<User[]>;
}


export { IUserRepository };
