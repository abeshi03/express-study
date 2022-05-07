interface LikeRepository {

  addLike: (userId: number, postId: number) => Promise<void>;
  removeLike: (userId: number, postId: number) => Promise<void>;
}


export { LikeRepository };
