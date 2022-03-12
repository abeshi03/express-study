/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { User } from "../../domain/User";

/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { AuthRepository } from "../../interfaces/database/repository/AuthRepository";
import { SignUpParams } from "../../interfaces/request/auth/SignUpRequest";


class AuthUseCase {
  private repository: AuthRepository;

  public constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  /* --- メール重複チェック --------------------------------------------------------------------------------------------- */
  public checkForUniqueEmail(email: string): Promise<boolean> {
    return this.repository.checkForUniqueEmail(email);
  }

  /* --- 会員登録 ----------------------------------------------------------------------------------------------------- */
  public signUp(query: SignUpParams): Promise<User> {
    return this.repository.signUp(query);
  }
}

export { AuthUseCase };
