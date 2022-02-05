/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { User } from "../../domain/User";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindUserListParams } from "../../interfaces/request/user/FindUserListRequest";

/* --- db処理 -------------------------------------------------------------------------------------------------------- */
import { UserRepository } from "../../interfaces/database/repository/UserRepository";

class UserUseCase {
  private repository: UserRepository;

  public constructor(repository: UserRepository) {
    this.repository = repository;
  }


  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  public findList(query: FindUserListParams): Promise<User[]> {
    return this.repository.findList(query);
  }

  public totalItemsCount(): Promise<number> {
    return this.repository.totalItemsCount();
  }

  public itemsCountInSelection(query: FindUserListParams): Promise<number> {
    return this.repository.itemsCountInSelection(query);
  }


  /* --- idでのユーザー取得 --------------------------------------------------------------------------------------------- */
  public find(targetUserId: number): Promise<User> {
    return this.repository.find(targetUserId);
  }


  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  public delete(targetUserId: number): Promise<void> {
    return this.repository.delete(targetUserId);
  }
}

export { UserUseCase };
