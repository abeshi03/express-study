import { User } from "../../domain/User";
import { IUserRepository } from "../../interfaces/database/repository/IUserRepository";
import { FindUserListParams } from "../../interfaces/request/user/FindUserListRequest";

class UserUseCase {
  private repository: IUserRepository;

  public constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  public findList(query: FindUserListParams): Promise<User[]> {
    return this.repository.findList(query);
  }

  public totalItemsCount(): Promise<number> {
    return this.repository.totalItemsCount();
  }

  public itemsCountInSelection(query: FindUserListParams): Promise<number> {
    return this.repository.itemsCountInSelection(query);
  }
}

export { UserUseCase };
