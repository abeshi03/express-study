/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { CreateUserPayload, User } from "./User";
import { CreateLikePayload, Like } from "./Like";

interface CreatePostPayload {
  id: number;
  userId: number;
  content: string;
  imageUri?: string | null;
  createdAt: Date;
  user: CreateUserPayload;
  like?: CreateLikePayload[];
}


class Post {
  private readonly _id: number;
  private readonly _userId: number;
  private readonly _content: string;
  private readonly _imageUri?: string | null;
  private readonly _createdAt: Date;
  private readonly _user: User;
  private readonly _like?: Like[];

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

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get user(): User {
    return this._user;
  }

  public get like(): Like[] | undefined {
    if (!this._like) return undefined;
    return this._like;
  }


  public constructor(payload: CreatePostPayload) {
    this._id = payload.id;
    this._userId = payload.userId;
    this._content = payload.content;
    this._imageUri = payload.imageUri;
    this._createdAt = payload.createdAt
    this._user = new User(payload.user);
    if (payload.like) {
      this._like = payload.like.map((like) => new Like(like));
    }
  }
}


export { Post, CreatePostPayload }
