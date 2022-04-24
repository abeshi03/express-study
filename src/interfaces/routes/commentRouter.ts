/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import express from "express";
import { body, param, query } from "express-validator";
import { PrismaClient } from "@prisma/client";

/* --- コントローラー -------------------------------------------------------------------------------------------------- */
import { CommentController } from "../controllers/CommentController";


const router = express.Router();

const postCommentRoutes = (prisma: PrismaClient): express.Router => {

  const commentController = new CommentController(prisma);

  router.get(
    "/:postId",
    [
      param("postId")
        .exists()
        .isInt()
        .withMessage("Invalid id"),
      query("limit")
        .exists()
        .withMessage("limit is missing")
        .isInt()
        .withMessage("Invalid limit"),
      query("pageNumber")
        .exists()
        .withMessage("pageNumber is missing")
        .isInt()
        .withMessage("Invalid pageNumber")
    ],
    async (req: express.Request, res: express.Response) => {
      const results = await commentController.findList(req);
      res.status(results.code).send(results);
    }
  );

  router.post(
    "/:postId",
    [
      param("postId")
        .exists()
        .isInt()
        .withMessage("Invalid id"),
      body("text")
        .exists()
        .withMessage("text is missing")
        .isString()
        .withMessage("Invalid text")
        .isLength({ min: 0, max: 280 })
        .withMessage("text must be 0 - 280 character long")
    ],
    async (req: express.Request, res: express.Response): Promise<void> => {

      console.log("user_id: ", req.session.userId);

      const results = await commentController.create(req, req.session.userId ?? 1);
      res.status(results.code).send(results);
    }
  )

  return router;
}


export { postCommentRoutes };
