import express, { Application } from "express";
import { router } from "./interfaces/router";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


