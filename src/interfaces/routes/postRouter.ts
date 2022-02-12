/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import express from "express";
import { body, param, query } from "express-validator";
import { PrismaClient } from "@prisma/client";

/* --- コントローラー -------------------------------------------------------------------------------------------------- */
import { PostController } from "../controllers/PostController";

const router = express.Router();

const postRoutes = (prisma: PrismaClient): express.Router => {
  const postController = new PostController(prisma);

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
