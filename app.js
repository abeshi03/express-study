const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!")
});

app.get("/test", (req, res) => {
  res.send("ルーティングのテスト")
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


