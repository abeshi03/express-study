/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { CommentRepository } from "../../interfaces/database/repository/CommentRepository";
import { FindCommentListParams } from "../../interfaces/request/comment/FindCommentListRequest";



class CommentUseCase {
  private repository: CommentRepository;

  public constructor(repository: CommentRepository) {
    this.repository = repository;
  }

  /* --- コメント一覧取得 ----------------------------------------------------------------------------------------------- */
  public findList(query: FindCommentListParams): Promise<CommentRepository.FindList.ResponseData> {
    return this.repository.findList(query);
  }
}

export { CommentUseCase }
