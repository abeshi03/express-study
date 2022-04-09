/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Comment } from "../../../domain/Comment";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindCommentListParams } from "../../request/comment/FindCommentListRequest";

interface CommentRepository {

  findList: (query: FindCommentListParams) => Promise<CommentRepository.FindList.ResponseData>;
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
