/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { CreateUserPayload, User } from "./User";
import { CreatePostPayload, Post } from "./Post";

interface CreateLikePayload {
  id: number;
  postId: number;
  userId: number;
  createdAt: Date;
  user: CreateUserPayload;
  post: CreatePostPayload;
}


class Like {
  private readonly _id: number;
  private readonly _postId: number;
  private readonly _userId: number;
  private readonly _createdAt: Date;
  private readonly _user: User;
  private readonly _post: Post;


  public get id(): number {
    return this._id;
  }

  public get userId(): number {
    return this._userId;
  }

  public get postId(): number {
    return this._postId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get user(): User {
    return this._user;
  }

  public get post(): Post {
    return this._post;
  }

  public constructor(payload: CreateLikePayload) {
    this._id = payload.id;
    this._userId = payload.userId;
    this._postId = payload.postId;
    this._createdAt = payload.createdAt;
    this._user = new User(payload.user)
    this._post = new Post(payload.post)
  }
}


export { Like, CreateLikePayload };
