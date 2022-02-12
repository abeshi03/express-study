/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { CreateUserPayload, User } from "./User";

interface CreatePostPayload {
  id: number;
  userId: number;
  content: string;
  imageUri?: string | null;
  user: CreateUserPayload;
}


class Post {
  private readonly _id: number;
  private readonly _userId: number;
  private readonly _content: string;
  private readonly _imageUri?: string | null;
  private readonly _user: User;

  public get id(): number {
    return this._id;
  }

  public get userId(): number {
    return this.userId;
  }

  public get content(): string {
    return this._content;
  }

  public get imageUri(): string | undefined {
    if (!this._imageUri) return undefined;
    return this._imageUri;
  }

  public get user(): User {
    return this._user;
  }


  public constructor(payload: CreatePostPayload) {
    this._id = payload.id;
    this._userId = payload.userId;
    this._content = payload.content;
    this._imageUri = payload.imageUri;
    this._user = new User(payload.user);
  }
}


export { Post, CreatePostPayload }
