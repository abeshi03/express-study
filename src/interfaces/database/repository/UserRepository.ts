/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { User } from "../../../domain/User";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindUserListParams } from "../../request/user/FindUserListRequest";
import { UpdateUserParams } from "../../request/user/UpdateUserRequest";
import { CreateUserParams } from "../../request/user/CreateUserRequest";

interface UserRepository {

  /* --- ユーザー一覧関連 ----------------------------------------------------------------------------------------------- */
  findList: (query: FindUserListParams) => Promise<User[]>;
  totalItemsCount: () => Promise<number>;
  itemsCountInSelection: (query: FindUserListParams) => Promise<number>;

  /* --- ユーザー詳細関連 ----------------------------------------------------------------------------------------------- */
  find: (targetUserId: number) => Promise<User>;

  /* --- ユーザー追加 -------------------------------------------------------------------------------------------------- */
  create: (query: CreateUserParams) => Promise<number>;

  /* --- ユーザー更新 -------------------------------------------------------------------------------------------------- */
  update: (targetUserId: number, query: UpdateUserParams) => Promise<void>;

  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  delete: (targetUserId: number) => Promise<void>;
}


export { UserRepository };
