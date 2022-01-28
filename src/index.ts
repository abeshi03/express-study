import express, { Application } from "express";
import { router } from "./interfaces/router";
import { PrismaClient } from '@prisma/client'

const app: Application = express();
const port = process.env.PORT || 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

const prisma = new PrismaClient();

async function main() {

  // await prisma.user.create({
  //   data: {
  //     name: "Alice",
  //     email: "alice@prisma.io",
  //     posts: {
  //       create: { title: "HELLO WORLD" }
  //     },
  //     profile: {
  //       create: { bio: "I like apple" }
  //     },
  //   },
  // })

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true
  //   }
  // })

  const post = await prisma.post.update({
    where: { id: 2 },
    data: { published: true },
  })
  console.log(post)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
