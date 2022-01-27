import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello world!")
});

// ルーティングの確認とJsonデータの返し方の確認
router.get("/test", (req: Request, res: Response) => {
  res.json({
    user: {
      name: "test_name",
      age: 18
    }
  })
});

export { router };
