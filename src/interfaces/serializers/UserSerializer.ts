import { User } from "../../domain/User";

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
    users: User[],
    totalItemsCount: number,
    itemsCountInSelection: number
  ): UsersResponse {
    const userResponses = users.map((user) => this.user(user));
    return {
      totalItemsCount: totalItemsCount,
      itemsCountInSelection: itemsCountInSelection,
      users: userResponses,
    };
  }


  /* --- ユーザーidレスポンス ------------------------------------------------------------------------------------------- */
  public id(id: number): IdResponse {
    return { id };
  }
}
