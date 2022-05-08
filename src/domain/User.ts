export const USER_ROLE = {
  admin: "ADMIN",
  normalUser: "NORMAL_USER"
} as const

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

/* prismaの型定義が任意の場合nullがはいるので任意フィールドはundefined | nullにする */
interface CreateUserPayload {
  id: number;
  email: string;
  name: string;
  role: string;
  description: string;
  avatarUri?: string | null;
}

class User {
  private readonly _id: number;
  private readonly _email: string;
  private readonly _name: string;
  private readonly _role: string;
  private readonly _description: string;
  private readonly _avatarUri?: string | null;

  public get id(): number {
    return this._id;
  }
  public get email(): string {
    return this._email;
  }
  public get name(): string {
    return this._name;
  }
  public get role(): UserRole {
    switch (this._role) {
      case "NORMAL_USER": return "NORMAL_USER";
      case "ADMIN": return "ADMIN";
      default: return "NORMAL_USER";
    }
  }
  public get description(): string {
    return this._description;
  }
  public get avatarUri(): string | undefined {
    /* レスポンスはundefinedで返す */
    if (!this._avatarUri) {
      return undefined;
    }
    return this._avatarUri;
  }

  public constructor(payload: CreateUserPayload) {
    this._id = payload.id;
    this._email = payload.email;
    this._name = payload.name;
    this._role = payload.role;
    this._description = payload.description;
    this._avatarUri = payload.avatarUri;
  }
}

export { User, CreateUserPayload };
