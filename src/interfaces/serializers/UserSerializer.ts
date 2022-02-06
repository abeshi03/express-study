/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { User } from "../../domain/User";

/* --- db関連 -------------------------------------------------------------------------------------------------------- */
import { UserRepository}  from "../database/repository/UserRepository";

export interface UsersResponse {
  totalItemsCount: number;
  itemsCountInSelection: number;
  users: UserResponse[];
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  description: string;
}

export interface IdResponse {
  id: number;
}

export class UserSerializer {

  /* --- ユーザーレスポンス --------------------------------------------------------------------------------------------- */
  public user(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      description: user.description
    };
  }


  /* --- ユーザー一覧レスポンス ------------------------------------------------------------------------------------------ */
  public users(
    items: UserRepository.FindList.ResponseData
  ): UsersResponse {
    const userResponses = items.users.map((user) => this.user(user));
    return {
      totalItemsCount: items.totalItemsCount,
      itemsCountInSelection: items.itemsCountInSelection,
      users: userResponses,
    };
  }


  /* --- ユーザーidレスポンス ------------------------------------------------------------------------------------------- */
  public id(id: number): IdResponse {
    return { id };
  }
}
