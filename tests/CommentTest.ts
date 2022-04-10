/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../src";

/* --- レスポンス ------------------------------------------------------------------------------------------------------ */
import { CommentResponse, CommentsResponse } from "../src/interfaces/serializers/CommentSerializer";


const baseUrl = "/post-comments";


export function commentTest(comment: CommentResponse): void {
  expect(typeof comment.id).toBe("number");
  expect(typeof comment.text).toBe("string");
  expect(typeof comment.text).toBeLessThanOrEqual(280);
  expect(typeof comment.commentedDateTime).toBe("string");
  expect(typeof comment.commentedUserData.id).toBe("number");
  expect(typeof comment.commentedUserData.name).toBe("string");

  if (comment.commentedUserData.avatarUri) {
    expect(typeof comment.commentedUserData.avatarUri).toBe("string");
  }
}


describe("GET:: /post-comments", () => {

  const limit = 5;
  const pageNumber = 1;

  it("Should get comment list", async () => {

    const res = await request(app).get(
      `${baseUrl}/1/?limit=${limit}&pageNumber=${pageNumber}`
    );

    expect(res.status).toEqual(200);
    const responseData: CommentsResponse = res.body.data;
    expect(typeof responseData.totalItemsCount).toEqual("number");

    expect(responseData.comments.length).toBe(limit);

    responseData.comments.forEach((comment) => {
      commentTest(comment);
    });
  });

  it("Insufficient limit", async () => {
    const res = await request(app).get(
      `${baseUrl}/1/?pageNumber=${pageNumber}`
    );

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("limit is missing");
  });

  it("Insufficient pageNumber", async () => {
    const res = await request(app).get(
      `${baseUrl}/1/?limit=${limit}`
    );

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("pageNumber is missing");
  });

  it("Invalid id", async () => {
    const res = await request(app).get(
      `${baseUrl}/"1"/?limit=${limit}&pageNumber=${pageNumber}`
    );

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid id");
  });

});
