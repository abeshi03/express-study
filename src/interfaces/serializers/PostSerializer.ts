import {Post} from "../../domain/Post";
import { UserResponse } from "./UserSerializer";

export interface IdResponse {
  id: number;
}

export interface PostResponse {
  id: number;
  content: string;
  imageUri?: string;
  postedUserData: UserResponse;
  postedDateTime: string;
}


export class PostSerializer {

  /* --- postレスポンス ----------------------------------------------------------------------------------------------- */
  public post(post: Post): PostResponse {
    return {
      id: post.id,
      content: post.content,
      imageUri: post.imageUri,
      postedUserData: {
        id: post.user.id,
        email: post.user.email,
        name: post.user.name,
        description: post.user.name,
        avatarUri: post.user.avatarUri,
      },
      postedDateTime: post.createdAt.toISOString()
    };
  }

  /* --- postIdレスポンス --------------------------------------------------------------------------------------------- */
  public id(id: number): IdResponse {
    return { id };
  }
}
