import express from "express";
import { PrismaClient } from "@prisma/client";

import { UserController } from "../controllers/UserController";

const router = express.Router();


const userRoutes = (prisma: PrismaClient): express.Router => {
  const userController = new UserController(prisma);

  router.get(
    "/",
    [],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await userController.findList();
      res.status(results.code).send(results);
    }
  );

  return router;
};

export { userRoutes };
