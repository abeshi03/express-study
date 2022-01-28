interface CreateUserPayload {
  id: number;
  email: string;
  name: string;
  description: string;
}

class User {
  private readonly _id: number;
  private readonly _email: string;
  private readonly _name: string;
  private readonly _description: string;

  public get id(): number {
    return this._id;
  }
  public get email(): string {
    return this._email;
  }
  public get name(): string {
    return this._name;
  }
  public get description(): string {
    return this._description;
  }

  public constructor(payload: CreateUserPayload) {
    this._id = payload.id;
    this._email = payload.email;
    this._name = payload.name;
    this._description = payload.description;
  }
}

export { User, CreateUserPayload };
