import express, { Request, Response, Router } from "express";
import { PrismaClient } from '@prisma/client'
import { userRoutes } from "./routes/user";

const prisma = new PrismaClient();
const router: Router = express.Router();


router.get("/", (req: Request, res: Response) => {
  res.send("Hello world!")
});

router.use("/users", userRoutes(prisma));

router.get("*", (req, res) => {
  return res.status(400).send({ error: "Invalid Url" });
});

export default router;
