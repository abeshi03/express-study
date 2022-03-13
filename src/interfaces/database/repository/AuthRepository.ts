/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { User } from "../../../domain/User";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { SignUpParams } from "../../request/auth/SignUpRequest";
import { SignInParams } from "../../request/auth/SignInRequest";


interface AuthRepository {

  checkForUniqueEmail: (email: string) => Promise<boolean>;

  signUp: (query: SignUpParams) => Promise<User>;

  signIn: (query: SignInParams) => Promise<User>;
}

export { AuthRepository };
