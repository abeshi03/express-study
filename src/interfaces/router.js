const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send("Hello world!")
});

// ルーティングの確認とJsonデータの返し方の確認
router.get("/test", (req, res) => {
  res.json({
    user: {
      name: "テスト名前",
      age: 18
    }
  })
});

module.exports = router;
