/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { User } from "../../../domain/User";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindUserListParams } from "../../request/user/FindUserListRequest";

interface UserRepository {

  /* --- ユーザー一覧関連 ----------------------------------------------------------------------------------------------- */
  findList: (query: FindUserListParams) => Promise<User[]>;
  totalItemsCount: () => Promise<number>;
  itemsCountInSelection: (query: FindUserListParams) => Promise<number>;

  /* --- ユーザー詳細関連 ----------------------------------------------------------------------------------------------- */
  find: (targetUserId: number) => Promise<User>;

  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  delete: (targetUserId: number) => Promise<void>;
}


export { UserRepository };
