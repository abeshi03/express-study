/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../domain/Post";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindPostListParams } from "../../request/post/FindPostListRequest";
import { FindPostParams } from "../../request/post/FindPostRequest";

interface PostRepository {

  /* --- 投稿一覧取得 -------------------------------------------------------------------------------------------------- */
  findList: (query: FindPostListParams, userId?: number) => Promise<PostRepository.FindList>;

  /* --- 投稿詳細取得 -------------------------------------------------------------------------------------------------- */
  find: (query: FindPostParams) => Promise<PostRepository.Find>;
}


namespace PostRepository {

  export type FindList = {
    posts: Post[];
    userId?: number;
  }

  export type Find = {
    post: Post,
    isPostToLikeByCurrentUser: boolean;
  }
}


export { PostRepository };
