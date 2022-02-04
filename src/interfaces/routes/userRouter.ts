import express from "express";
import { query } from "express-validator";
import { PrismaClient } from "@prisma/client";

import { UserController } from "../controllers/UserController";
import { FindUserListRequest } from "../request/user/FindUserListRequest";

const router = express.Router();


const userRoutes = (prisma: PrismaClient): express.Router => {
  const userController = new UserController(prisma);

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

  return router;
};

export { userRoutes };
