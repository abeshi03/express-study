/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import express from "express";
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

/* --- コントローラー -------------------------------------------------------------------------------------------------- */
import { AuthController } from "../controllers/AuthController";

/* --- リクエスト ----------------------------------------------------------------------------------------------------- */
import { SignUpRequest } from "../request/auth/SignUpRequest";
import { SignInRequest } from "../request/auth/SignInRequest";


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


  router.post(
    "/signUp",
    [
      body("email")
        .exists()
        .withMessage("email is missing")
        .isString()
        .withMessage("Invalid email"),
      body("password")
        .exists()
        .withMessage("password is missing")
        .isString()
        .withMessage("Invalid password")
        .isLength({ min: 0, max: 255 })
        .withMessage("password must be 0 - 255 character long"),
      body("name")
        .exists()
        .withMessage("name is missing")
        .isString()
        .withMessage("Invalid name"),
      body("description")
        .exists()
        .withMessage("description is missing")
        .isString()
        .withMessage("Invalid description")
        .isLength({ min: 0, max: 200 })
        .withMessage("description must be 0 - 200 character long"),
      body("avatarUri")
        .exists()
        .withMessage("avatarUri is missing")
        .isString()
        .withMessage("Invalid avatarUri")
        .optional({ nullable: true })
    ],
    async (req: SignUpRequest, res: express.Response): Promise<void> => {
      const results = await authController.signUp(req);

      if (results.code === 200 && results.data) {
        req.session.userId = results.data.id
      }

      res.status(results.code).send(results)
    }
  )


  router.post(
    "/signOut",
    [],
    async (req: express.Request, res: express.Response): Promise<void> => {

      try {
        req.session.destroy(() => {});

        const results = {
          code: 200,
          message: "Success",
          respondedAt: moment().format()
        }

        res.status(results.code).send(results)
      } catch (error: unknown) {

        console.error(error);
        const results = {
          code: 401,
          message: "Authentication error",
          respondedAt: moment().format()
        }

        res.status(results.code).send(results);
      }
    }
  )


  router.post(
    "/signIn",
    [
      body("email")
        .exists()
        .withMessage("email is missing")
        .isString()
        .withMessage("Invalid email"),
      body("password")
        .exists()
        .withMessage("password is missing")
        .isString()
        .withMessage("Invalid password")
        .isLength({ min: 0, max: 255 })
        .withMessage("password must be 0 - 255 character long"),
    ],
    async (req: SignInRequest, res: express.Response): Promise<void> => {

      const results = await authController.signIn(req);

      if (results.code === 200 && results.data) {
        req.session.userId = results.data.id
      }

      res.status(results.code).send(results);
    }
  )

  return router;
}


export { authRoutes }
