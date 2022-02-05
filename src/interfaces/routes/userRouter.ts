/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import express from "express";
import { param, query } from "express-validator";
import { PrismaClient } from "@prisma/client";

/* --- コントローラー -------------------------------------------------------------------------------------------------- */
import { UserController } from "../controllers/UserController";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { FindUserListRequest } from "../request/user/FindUserListRequest";
import { UpdateUserRequest } from "../request/user/UpdateUserRequest";
import { CreateUserRequest } from "../request/user/CreateUserRequest";

const router = express.Router();


const userRoutes = (prisma: PrismaClient): express.Router => {
  const userController = new UserController(prisma);


  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  router.get(
    "/",
    [
      query("paginationPageNumber")
        .exists()
        .withMessage("paginationPageNumber is missing")
        .isInt()
        .withMessage("Invalid paginationPageNumber"),
      query("itemsCountPerPaginationPage")
        .exists()
        .withMessage("itemsCountPerPaginationPage is missing")
        .isInt()
        .withMessage("invalid itemsCountPerPaginationPage"),
      query("searchByUserName").optional().isString().withMessage("Invalid searchByUserName")
    ],
    async (req: FindUserListRequest, res: express.Response): Promise<void> => {
      const results = await userController.findList(req);
      res.status(results.code).send(results);
    }
  );



  /* --- idでのユーザー取得 --------------------------------------------------------------------------------------------- */
  router.get(
    "/:id",
    [
      param("id")
        .exists()
        .isInt()
        .withMessage("Invalid id")
    ],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await userController.find(req);
      res.status(results.code).send(results);
    }
  )


  /* --- ユーザー追加 -------------------------------------------------------------------------------------------------- */
  router.post(
    "/:id",
    [
      param("id")
        .exists()
        .isInt()
        .withMessage("Invalid id")
    ],
    async (req: CreateUserRequest, res: express.Response): Promise<void> => {
      const results = await userController.create(req);
      res.status(results.code).send(results);
    }
  )


  /* --- ユーザー更新 -------------------------------------------------------------------------------------------------- */
  router.patch(
    "/:id",
    [
      param("id")
        .exists()
        .isInt()
        .withMessage("Invalid id")
    ],
    async (req: UpdateUserRequest, res: express.Response) => {
      const results = await userController.update(req);
      res.status(results.code).send(results);
    }
  )


  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  router.delete(
    "/:id",
    [
      param("id")
        .exists()
        .isInt()
        .withMessage("Invalid id")
    ],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await userController.delete(req);
      res.status(results.code).send(results)
    }
  )

  return router;
};

export { userRoutes };
