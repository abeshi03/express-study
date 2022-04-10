/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { CommentRepository } from "../../interfaces/database/repository/CommentRepository";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindCommentListParams } from "../../interfaces/request/comment/FindCommentListRequest";
import { CreateCommentParams } from "../../interfaces/request/comment/CreateCommentRequest";



class CommentUseCase {
  private repository: CommentRepository;

  public constructor(repository: CommentRepository) {
    this.repository = repository;
  }

  /* --- コメント一覧取得 ----------------------------------------------------------------------------------------------- */
  public findList(
    query: FindCommentListParams,
    postId: number
  ): Promise<CommentRepository.FindList.ResponseData> {
    return this.repository.findList(query, postId);
  }

  public create(
    query: CreateCommentParams,
    userId: number,
    postId: number
  ): Promise<number> {
    return this.repository.create(query, userId, postId);
  }
}

export { CommentUseCase }
