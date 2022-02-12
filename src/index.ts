import express, { Application } from "express";
import { PrismaClient } from '@prisma/client'
import { userRoutes } from "./interfaces/routes/userRouter";

const app: Application = express();


const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world!")
});

app.use("/users", userRoutes(prisma));

app.get("*", (req, res) => {
  return res.status(400).send({ error: "Invalid Url" });
});

export default app;
