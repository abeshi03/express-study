import { Prisma, PrismaClient } from "@prisma/client";
import moment from "moment";


const prisma = new PrismaClient();


const usersData: Prisma.UserCreateInput[] = [
  {
    email: "example1@test.com",
    name: "ユーザー1",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example2@test.com",
    name: "ユーザー2",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example3@test.com",
    name: "ユーザー3",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example4@test.com",
    name: "ユーザー4",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example5@test.com",
    name: "ユーザー5",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example6@test.com",
    name: "ユーザー6",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example7@test.com",
    name: "ユーザー7",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example8@test.com",
    name: "ユーザー8",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example9@test.com",
    name: "ユーザー9",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example10@test.com",
    name: "ユーザー10",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example11@test.com",
    name: "ユーザー11",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example12@test.com",
    name: "ユーザー12",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example13@test.com",
    name: "ユーザー13",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example14@test.com",
    name: "ユーザー14",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example15@test.com",
    name: "ユーザー15",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example16@test.com",
    name: "ユーザー16",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example17@test.com",
    name: "ユーザー17",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example18@test.com",
    name: "ユーザー18",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example19@test.com",
    name: "ユーザー19",
    description: "宜しくお願いします",
    avatarUri: "http://placekitten.com/200/300",
    createdAt: moment().format()
  },
  {
    email: "example20@test.com",
    name: "ユーザー20",
    description: "宜しくお願いします",
    createdAt: moment().format()
  }
];


const postsData: Prisma.PostCreateInput[] = [
  {
    content: "ユーザー1のテスト投稿です！",
    imageUri: "http://placekitten.com/200/300",
    user: { connect: { id: 1 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー1のテスト投稿です！",
    user: { connect: { id: 1 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー1のテスト投稿です！",
    user: { connect: { id: 1 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー2のテスト投稿です！",
    user: { connect: { id: 2 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー2のテスト投稿です！",
    user: { connect: { id: 2 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー2のテスト投稿です！",
    user: { connect: { id: 2 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー3のテスト投稿です！",
    user: { connect: { id: 3 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー3のテスト投稿です！",
    user: { connect: { id: 3 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー3のテスト投稿です！",
    user: { connect: { id: 3 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー3のテスト投稿です！",
    user: { connect: { id: 3 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー3のテスト投稿です！",
    user: { connect: { id: 3 } },
    createdAt: moment().format()
  },
  {
    content: "ユーザー3のテスト投稿です！",
    user: { connect: { id: 3 } },
    createdAt: moment().format()
  }
];


async function createSeedData() {

  try {

    for (const user of usersData) {
      await prisma.user.create({ data: user });
    }

    for (const post of postsData) {
      await prisma.post.create({ data: post });
    }

  } catch (error: unknown) {

    console.error(error);
    process.exit(1);
  } finally {

    await prisma.$disconnect();
  }
}

createSeedData();
