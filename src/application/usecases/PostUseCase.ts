/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { Post } from "../../domain/Post";

/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { PostRepository } from "../../interfaces/database/repository/PostRepository";
import { FindPostListParams, FindPostListRequest } from "../../interfaces/request/post/FindPostListRequest";


class PostUseCase {
  private repository: PostRepository;

  public constructor(repository: PostRepository) {
    this.repository = repository;
  }

  /* --- 投稿一覧取得 -------------------------------------------------------------------------------------------------- */
  public findList(query: FindPostListParams): Promise<PostRepository.FindList.ResponseData> {
    return this.repository.findList(query);
  }


  /* --- idでの投稿取得 ------------------------------------------------------------------------------------------------ */
  public find(targetPostId: number): Promise<Post> {
    return this.repository.find(targetPostId);
  }
}


export { PostUseCase };
