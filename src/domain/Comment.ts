import {CreateUserPayload, User} from "./User";

interface CreateCommentPayload {
  id: number;
  userId: number;
  postId: number;
  text: string;
  createdAt: Date;
  user: CreateUserPayload;
}


class Comment {
  private readonly _id: number;
  private readonly _userId: number;
  private readonly _postId: number;
  private readonly _text: string;
  private readonly _createdAt: Date;
  private readonly _user: User;

  public get id(): number {
    return this._id;
  }

  public get userId(): number {
    return this._userId;
  }

  public get postId(): number {
    return this._postId;
  }

  public get text(): string {
    return this._text;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get user(): User {
    return this._user;
  }

  public constructor(payload: CreateCommentPayload) {
    this._id = payload.id;
    this._userId = payload.userId;
    this._postId = payload.postId;
    this._text = payload.text;
    this._createdAt = payload.createdAt;
    this._user = new User(payload.user)
  }
}
