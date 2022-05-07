/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { PostRepository } from "../../interfaces/database/repository/PostRepository";
import { FindPostListParams } from "../../interfaces/request/post/FindPostListRequest";
import { FindPostParams } from "../../interfaces/request/post/FindPostRequest";


class PostUseCase {
  private repository: PostRepository;

  public constructor(repository: PostRepository) {
    this.repository = repository;
  }

  /* --- 投稿一覧取得 -------------------------------------------------------------------------------------------------- */
  public findList(query: FindPostListParams, userId?: number): Promise<PostRepository.FindList> {
    return this.repository.findList(query, userId);
  }


  /* --- idでの投稿取得 ------------------------------------------------------------------------------------------------ */
  public find(query: FindPostParams): Promise<PostRepository.Find> {
    return this.repository.find(query);
  }
}


export { PostUseCase };
