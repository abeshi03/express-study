/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { User } from "../../domain/User";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindUserListParams } from "../../interfaces/request/user/FindUserListRequest";

/* --- db処理 -------------------------------------------------------------------------------------------------------- */
import { UserRepository } from "../../interfaces/database/repository/UserRepository";
import { UpdateUserParams } from "../../interfaces/request/user/UpdateUserRequest";
import { CreateUserParams } from "../../interfaces/request/user/CreateUserRequest";

class UserUseCase {
  private repository: UserRepository;

  public constructor(repository: UserRepository) {
    this.repository = repository;
  }


  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  public findList(query: FindUserListParams): Promise<UserRepository.FindList.ResponseData> {
    return this.repository.findList(query);
  }


  /* --- idでのユーザー取得 --------------------------------------------------------------------------------------------- */
  public find(targetUserId: number): Promise<User> {
    return this.repository.find(targetUserId);
  }


  /* --- ユーザー追加 -------------------------------------------------------------------------------------------------- */
  public create(query: CreateUserParams): Promise<number> {
    return this.repository.create(query);
  }


  /* --- ユーザー更新 -------------------------------------------------------------------------------------------------- */
  public update(targetUserId: number, query: UpdateUserParams): Promise<void> {
    return this.repository.update(targetUserId, query);
  }


  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  public delete(targetUserId: number): Promise<void> {
    return this.repository.delete(targetUserId);
  }
}

export { UserUseCase };
