/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Post } from "../../domain/Post";

/* --- レスポンス ------------------------------------------------------------------------------------------------------ */
import { UserResponse } from "./UserSerializer";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { PostRepository } from "../database/repository/PostRepository";

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

export interface PostsResponse {
  posts: PostResponse[];
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

  /* --- post一覧レスポンス -------------------------------------------------------------------------------------------- */
  public posts(items: PostRepository.FindList.ResponseData): PostsResponse {
    const postResponse = items.posts.map((post) => this.post(post));
    return {
      posts: postResponse
    }
  }

  /* --- postIdレスポンス --------------------------------------------------------------------------------------------- */
  public id(id: number): IdResponse {
    return { id };
  }
}
