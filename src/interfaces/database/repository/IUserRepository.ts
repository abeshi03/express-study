import { User } from "../../../domain/User";

interface IUserRepository {
  findList: () => Promise<User[]>;
}


export { IUserRepository };
