/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Comment } from "../../domain/Comment";

/* --- レスポンス ------------------------------------------------------------------------------------------------------ */
import { UserResponse } from "./UserSerializer";

/* --- db関連 --------------------------------------------------------------------------------------------------------- */
import { CommentRepository } from "../database/repository/CommentRepository";


export interface CommentResponse {
  id: number;
  text: string;
  commentedUserData: Pick<UserResponse, "id" | "avatarUri" | "name">;
  commentedDateTime: string;
}

export interface CommentsResponse {
  comments: CommentResponse[];
  totalItemsCount: number;
}


export class CommentSerializer {

  public comment(comment: Comment): CommentResponse {
    return {
      id: comment.id,
      text: comment.text,
      commentedUserData: {
        id: comment.user.id,
        name: comment.user.name,
        avatarUri: comment.user.avatarUri
      },
      commentedDateTime: comment.createdAt.toISOString()
    }
  }

  public comments(items: CommentRepository.FindList.ResponseData): CommentsResponse {

    const commentResponse = items.postComments.map((postComment) => this.comment(postComment));
    return {
      comments: commentResponse,
      totalItemsCount: items.totalItemsCount
    }
  }
}
