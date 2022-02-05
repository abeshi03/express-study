import { User } from "../../../domain/User";
import { FindUserListParams } from "../../request/user/FindUserListRequest";

interface UserRepository {
  findList: (query: FindUserListParams) => Promise<User[]>;
  totalItemsCount: () => Promise<number>;
  itemsCountInSelection: (query: FindUserListParams) => Promise<number>;
  find: (targetUserId: number) => Promise<User>;
}


export { UserRepository };
