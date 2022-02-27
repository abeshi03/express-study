/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../src";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { userTest } from "./User.test";
import { PostResponse } from "../src/interfaces/serializers/PostSerializer";


const baseUrl = "/posts"

export function postTest(post: PostResponse) {
  expect(typeof post.id).toBe("number");
  expect(typeof post.content).toBe("string");
  expect(post.content.length).toBeLessThanOrEqual(280);
  if (post.imageUri) {
    expect(typeof post.imageUri).toBe("string");
  }
  userTest(post.postedUserData);
}


describe("GET /posts", () => {

  const limit = 4;
  const pageNumber = 4;


  it("Should get posts list", async () => {

    const res = await request(app).get(`${baseUrl}?limit=${limit}&pageNumber=${pageNumber}`);

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");
    const posts: PostResponse[] = res.body.data.posts;

    expect(posts.length).toEqual(limit);

    posts.forEach((post) => {
      postTest(post);
    })
  })
});
