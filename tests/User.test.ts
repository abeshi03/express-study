/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../src";
import { UserResponse, UsersResponse } from "../src/interfaces/serializers/UserSerializer";


const baseUrl = "/users"

export function userTest(user: UserResponse): void {
  expect(typeof user.id).toBe("number");
  expect(typeof user.email).toBe("string");
  expect(typeof user.name).toBe("string");
  expect(typeof user.description).toBe("string");
  expect(user.description.length).toBeLessThanOrEqual(200);
  if (user.avatarUri) {
    expect(typeof user.avatarUri).toBe("string");
    expect(user.avatarUri.length).toBeLessThanOrEqual(200);
  }
}


describe("GET /users", () => {

  const paginationPageNumber = 4;
  const itemsCountPerPaginationPage = 4;

  it("Should get users list", async () => {

    const res = await request(app).get(
      `${baseUrl}?paginationPageNumber=${paginationPageNumber}&itemsCountPerPaginationPage=${itemsCountPerPaginationPage}`
    );

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");
    expect(typeof res.body.data.totalItemsCount).toBe("number")
    expect(typeof res.body.data.itemsCountInSelection).toBe("number")
    // TODO
    expect(typeof res.body.data.users).toBe("object")

    const users: UserResponse[] = res.body.data.users;

    expect(users.length).toBe(itemsCountPerPaginationPage)

    users.map((user) => {
      userTest(user);
    });
  });

  it("Insufficient parameters", async () => {

    const res = await request(app).get(baseUrl);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("paginationPageNumber is missing");
  });

  it("Invalid paginationPageNumber", async () => {

    const res = await request(app).get(`${baseUrl}?paginationPageNumber=string`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid paginationPageNumber");
  })

  it("Insufficient itemsCountPerPaginationPage", async () => {

    const res = await request(app).get(`${baseUrl}?paginationPageNumber=5`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("itemsCountPerPaginationPage is missing");
  });

  it("invalid itemsCountPerPaginationPage", async () => {

    const res = await request(app).get(`${baseUrl}?paginationPageNumber=1&itemsCountPerPaginationPage=string`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("invalid itemsCountPerPaginationPage");
  });

});


describe("GET:: /users/{id}", () => {

  it ("Should get user", async () => {
    const res = await request(app).get(`${baseUrl}/1`)
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");
    userTest(res.body.data);
  });

  it ("Invalid id", async () => {
    const res = await request(app).get(`${baseUrl}/'1'`)
    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid id");
  });

});
