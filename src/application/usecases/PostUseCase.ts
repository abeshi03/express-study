/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { Post } from "../../domain/Post";

/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { PostRepository } from "../../interfaces/database/repository/PostRepository";


class PostUseCase {
  private repository: PostRepository;

  public constructor(repository: PostRepository) {
    this.repository = repository;
  }


  /* --- idでの投稿取得 ------------------------------------------------------------------------------------------------ */
  public find(targetPostId: number): Promise<Post> {
    return this.repository.find(targetPostId);
  }
}


export { PostUseCase };
