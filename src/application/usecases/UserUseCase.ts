import { User } from "../../domain/User";
import { UserRepository } from "../../interfaces/database/repository/UserRepository";
import { FindUserListParams } from "../../interfaces/request/user/FindUserListRequest";

class UserUseCase {
  private repository: UserRepository;

  public constructor(repository: UserRepository) {
    this.repository = repository;
  }

  /* ユーザー一覧取得 ================================================================================================== */
  public findList(query: FindUserListParams): Promise<User[]> {
    return this.repository.findList(query);
  }

  public totalItemsCount(): Promise<number> {
    return this.repository.totalItemsCount();
  }

  public itemsCountInSelection(query: FindUserListParams): Promise<number> {
    return this.repository.itemsCountInSelection(query);
  }


  /* idでのユーザー取得 ================================================================================================ */
  public find(targetUserId: number): Promise<User> {
    return this.repository.find(targetUserId);
  }
}

export { UserUseCase };
