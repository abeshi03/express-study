/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../src";
import { UserResponse } from "../src/interfaces/serializers/UserSerializer";


const baseUrl = "/users"

const testData = {
  email: "update@update.com",
  name: "update test",
  description: "update test!!",
  avatarUri: "http://placekitten.com/200/300"
}

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

    expect(users.length).toBe(itemsCountPerPaginationPage);

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

    const res = await request(app).get(`${baseUrl}/2`);

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");
    userTest(res.body.data);
  });

  it ("Invalid id", async () => {

    const res = await request(app).get(`${baseUrl}/'2'`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid id");
  });

});


describe("POST:: /users", () => {

  it ("Should create user", async () => {
    const createUserResponse = await request(app).post(baseUrl).send({
      ...testData,
      email: "create@create.com"
    })

    expect(createUserResponse.status).toEqual(200);
    expect(createUserResponse.body.message).toEqual("Success");

    await request(app).delete(`${baseUrl}/${createUserResponse.body.data.id}`)
  });

});


describe("PATCH:: /users/{id}", () => {

  it ("Should update user", async () => {

    const updateResponse = await request(app).patch(`${baseUrl}/2`).send(testData);

    expect(updateResponse.status).toEqual(200);
    expect(updateResponse.body.message).toEqual("Success");

    const getUserResponse = await request(app).get(`${baseUrl}/2`);
    expect(getUserResponse.body.data.name).toEqual("update test");
  });

  it ("Invalid id", async () => {

    const res = await request(app).patch(`${baseUrl}/'2'`).send(testData);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid id");
  });

  it ("AvatarUri is null", async () => {

    const updateUserResponse = await request(app).patch(`${baseUrl}/2`).send({
      ...testData,
      avatarUri: null
    });

    expect(updateUserResponse.status).toEqual(200);
    expect(updateUserResponse.body.message).toEqual("Success");

    const getUserResponse = await request(app).get(`${baseUrl}/2`);
    expect(getUserResponse.body.data.avatarUri).toBeUndefined();
  });

});


describe("DELETE:: /users/{id}", () => {

  it ("should delete user", async () => {

    const createUserResponse = await request(app).post(baseUrl).send({
      ...testData,
      email: "create@create.com"
    });

    const res = await request(app).delete(`${baseUrl}/${createUserResponse.body.data.id}`);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");
  });


  it ("Invalid id", async () => {
    const res = await request(app).delete(`${baseUrl}/'2'`)
    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid id");
  });

});
