import express from "express";
const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world!")
});

// ルーティングの確認とJsonデータの返し方の確認
router.get("/test", (req: express.Request, res: express.Response) => {
  res.json({
    user: {
      name: "test_name",
      age: 18
    }
  })
});

export { router };
