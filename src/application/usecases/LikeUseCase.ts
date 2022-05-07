/* --- db処理 --------------------------------------------------------------------------------------------------------- */
import { LikeRepository } from "../../interfaces/database/repository/LikeRepository";


class LikeUseCase {
  private repository: LikeRepository;

  public constructor(repository: LikeRepository) {
    this.repository = repository;
  }

  addLike(userId: number, postId: number): Promise<void> {
    return this.repository.addLike(userId, postId);
  }

  removeLike(userId: number, postId: number): Promise<void> {
    return this.repository.removeLike(userId, postId);
  }
}


export { LikeUseCase };
