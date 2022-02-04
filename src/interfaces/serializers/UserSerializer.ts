import { User } from "../../domain/User";

export interface UsersResponse {
  totalItemsCount: number;
  itemsCountInSelection: number;
  users__actualForSpecifiedPaginationPage: UserResponse[];
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  description: string;
}

export class UserSerializer {
  public user(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      description: user.description
    };
  }

  public users(users: User[]): UserResponse[] {
    return users.map((user: User) => this.user(user));
  }
}
