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
  like: {
    totalCount: number;
    isPostToLikeByCurrentUser: boolean;
  }
}

export interface PostsResponse {
  posts: PostResponse[];
}


export class PostSerializer {

  /* --- postレスポンス ----------------------------------------------------------------------------------------------- */
  public post(items: PostRepository.Find): PostResponse {

    return {
      id: items.post.id,
      content: items.post.content,
      imageUri: items.post.imageUri,
      postedUserData: {
        id: items.post.user.id,
        email: items.post.user.email,
        name: items.post.user.name,
        description: items.post.user.name,
        avatarUri: items.post.user.avatarUri,
      },
      postedDateTime: items.post.createdAt.toISOString(),
      like: {
        totalCount: items.post.like?.length ?? 0,
        isPostToLikeByCurrentUser: items.isPostToLikeByCurrentUser
      }
    };
  }

  /* --- post一覧レスポンス -------------------------------------------------------------------------------------------- */
  public posts(items: PostRepository.FindList): PostsResponse {

    const isPostToLikeByCurrentUser = (post: Post): boolean => {
      if (!post.like || !items.userId) return false;
      return post.like.map((like) => like.userId).includes(items.userId)
    }

    const postResponse = items.posts.map((post) => this.post({
      post,
      isPostToLikeByCurrentUser: isPostToLikeByCurrentUser(post)
    }));
    return {
      posts: postResponse
    }
  }

  /* --- postIdレスポンス --------------------------------------------------------------------------------------------- */
  public id(id: number): IdResponse {
    return { id };
  }
}
