import { User } from "../../../domain/User";
import { FindUserListParams } from "../../request/user/FindUserListRequest";

interface IUserRepository {
  findList: (query: FindUserListParams) => Promise<User[]>;
  totalItemsCount: () => Promise<number>;
  itemsCountInSelection: (query: FindUserListParams) => Promise<number>;
}


export { IUserRepository };
