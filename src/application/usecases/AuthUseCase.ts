/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { User } from "../../domain/User";

/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { AuthRepository } from "../../interfaces/database/repository/AuthRepository";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { SignUpParams } from "../../interfaces/request/auth/SignUpRequest";
import { SignInParams } from "../../interfaces/request/auth/SignInRequest";


class AuthUseCase {
  private repository: AuthRepository;

  public constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  /* --- メール重複チェック --------------------------------------------------------------------------------------------- */
  public checkForUniqueEmail(email: string): Promise<boolean> {
    return this.repository.checkForUniqueEmail(email);
  }

  /* --- 認証関連 ----------------------------------------------------------------------------------------------------- */
  public signUp(query: SignUpParams): Promise<User> {
    return this.repository.signUp(query);
  }

  public signIn(query: SignInParams): Promise<User> {
    return this.repository.signIn(query);
  }
}

export { AuthUseCase };
