interface CreatePostPayload {
  id: number;
  content: string;
  imageUri?: string;
}


class Post {
  private readonly _id: number;
  private readonly _content: string;
  private readonly _imageUri?: string | null;

  public get id(): number {
    return this._id;
  }

  public get content(): string {
    return this._content;
  }

  public get imageUri(): string | undefined {
    if (!this._imageUri) return undefined;
    return this._imageUri;
  }


  public constructor(payload: CreatePostPayload) {
    this._id = payload.id;
    this._content = payload.content;
    this._imageUri = payload.imageUri;
  }
}


export { Post, CreatePostPayload }
