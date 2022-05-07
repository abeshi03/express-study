interface CreateLikePayload {
  id: number;
  postId: number;
  userId: number;
  createdAt: Date;
}


class Like {
  private readonly _id: number;
  private readonly _postId: number;
  private readonly _userId: number;
  private readonly _createdAt: Date;


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

  public constructor(payload: CreateLikePayload) {
    this._id = payload.id;
    this._userId = payload.userId;
    this._postId = payload.postId;
    this._createdAt = payload.createdAt;
  }
}


export { Like, CreateLikePayload };
