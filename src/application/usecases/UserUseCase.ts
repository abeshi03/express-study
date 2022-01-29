import { User } from "../../domain/User";
import { IUserRepository } from "../../interfaces/database/repository/IUserRepository";

class UserUseCase {
  private repository: IUserRepository;

  public constructor(repository: IUserRepository) {
    this.repository = repository;
  }
  public findList(): Promise<User[]> {
    return this.repository.findList();
  }
}

export { UserUseCase };
