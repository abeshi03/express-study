/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import express, { Application } from "express";
import { PrismaClient } from '@prisma/client'
import cors from "cors";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { userRoutes } from "./interfaces/routes/userRouter";
import { postRoutes } from "./interfaces/routes/postRouter";
import { authRoutes } from "./interfaces/routes/authRouter";


const app: Application = express();
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};


const prisma = new PrismaClient();

app.use(cors(options));
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world!")
});

app.use("/users", userRoutes(prisma));
app.use("/posts", postRoutes(prisma));
app.use("/auth", authRoutes(prisma));

app.get("*", (req, res) => {
  return res.status(400).send({ error: "Invalid Url" });
});

export default app;
