/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import express from "express";
import { param, query } from "express-validator";
import { PrismaClient } from "@prisma/client";

/* --- コントローラー -------------------------------------------------------------------------------------------------- */
import { PostController } from "../controllers/PostController";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindPostListRequest } from "../request/post/FindPostListRequest";


const router = express.Router();

const postRoutes = (prisma: PrismaClient): express.Router => {
  const postController = new PostController(prisma);


  /* --- 投稿一覧取得 -------------------------------------------------------------------------------------------------- */
  router.get(
    "/",
    [
      query("limit")
        .exists()
        .withMessage("limit is missing")
        .isInt()
        .withMessage("Invalid limit"),
      query("pageNumber")
        .exists()
        .withMessage("pageNumber is missing")
        .isInt()
        .withMessage("Invalid pageNumber"),
      query("searchByPostContent")
        .optional().isString().withMessage("Invalid searchByPostContent")
    ],
    async (req: FindPostListRequest, res: express.Response): Promise<void> => {
      const results = await postController.findList(req);
      res.status(results.code).send(results)
    }
  )

  /* --- idでの投稿取得 ------------------------------------------------------------------------------------------------ */
  router.get(
    "/:id",
    [
      param("id")
        .exists()
        .isInt()
        .withMessage("Invalid id")
    ],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await postController.find(req);
      res.status(results.code).send(results);
    }
  )

  return router;
}


export { postRoutes };
