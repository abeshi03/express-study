/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Comment } from "../../../domain/Comment";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindCommentListParams } from "../../request/comment/FindCommentListRequest";
import { CreateCommentParams } from "../../request/comment/CreateCommentRequest";

interface CommentRepository {

  findList: (
    query: FindCommentListParams,
    postId: number
  ) => Promise<CommentRepository.FindList.ResponseData>;

  create: (
    query: CreateCommentParams,
    userId: number,
    postId: number
  ) => Promise<number>;
}


namespace CommentRepository {

  export namespace FindList {

    export type ResponseData = {
      totalItemsCount: number;
      postComments: Comment[];
    }
  }
}


export { CommentRepository };
