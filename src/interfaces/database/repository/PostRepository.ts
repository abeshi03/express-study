/* --- 実態 ---------------------------------------------------------------------------------------------------------- */
import { Post } from "../../../domain/Post";

/* --- リクエスト ------------------------------------------------------------------------------------------------------ */
import { FindPostListParams } from "../../request/post/FindPostListRequest";

interface PostRepository {

  /* --- 投稿一覧取得 -------------------------------------------------------------------------------------------------- */
  findList: (query: FindPostListParams) => Promise<PostRepository.FindList.ResponseData>;

  /* --- 投稿詳細取得 -------------------------------------------------------------------------------------------------- */
  find: (targetPostId: number) => Promise<Post>;
}


namespace PostRepository {

  export namespace FindList {

    export type ResponseData = {
      posts: Post[];
    }
  }
}


export { PostRepository };
