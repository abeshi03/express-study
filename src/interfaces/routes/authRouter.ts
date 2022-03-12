/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import express from "express";
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";

/* --- コントローラー -------------------------------------------------------------------------------------------------- */
import { AuthController } from "../controllers/AuthController";



const router = express.Router();

const authRoutes = (prisma: PrismaClient): express.Router => {
  const authController = new AuthController(prisma);


  /* --- メールアドレスの重複チェック ------------------------------------------------------------------------------------- */
  router.post(
    "/check-for-unique-email",
    [
      body("email")
        .exists()
        .withMessage("email is missing")
        .isString()
        .withMessage("Invalid email")
    ],
    async (req: express.Request<{ email: string; }>, res: express.Response): Promise<void> => {
      const results = await authController.checkForUniqueEmail(req);
      res.status(results.code).send(results);
    }
  )

  return router;
}


export { authRoutes }
