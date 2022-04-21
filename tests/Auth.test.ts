/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../src";

/* --- 実態 ----------------------------------------------------------------------------------------------------------- */
import { User } from "../src/domain/User";

/* --- レスポンス ------------------------------------------------------------------------------------------------------ */
import { UserResponse } from "../src/interfaces/serializers/UserSerializer";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { userTest } from "./User.test";


const baseUrl = "/auth";

describe("POST /signIn", () => {

  it("Should signIn", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      email: "example1@test.com",
      password: "password"
    });

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");

    const user: UserResponse = res.body.data;

    userTest(user);
  });

  it("Email is missing", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      password: "password"
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("email is missing");
  });

  it("Password is missing", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      email: "password@password5.com",
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("password is missing");
  });

  it("Invalid email", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      email: 222,
      password: "password"
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid email");
  });

  it("Invalid password", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      email: "password@password5.com",
      password: 1111
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid password");
  });

  it("password is 3 character", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      email: "password@password5.com",
      password: "111"
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("password must be 4 - 255 character long");
  });

  it("password is 266 character", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      email: "password@password5.com",
      password: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("password must be 4 - 255 character long");
  });
});

describe("POST: /signUp", () => {

  const signUpTestData = {
    email: "signUpTestData@signUpTestData.com",
    name: "signUpTest",
    password: "password",
    description: "signUpTest",
    avatarUri: "http://placekitten.com/200/300"
  }

  it("Should signUp", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData
    });

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");

    const user: User = res.body.data;
    userTest(user);

    await request(app).delete(`/users/${user.id}`)
  });

  it("name is missing", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      email: undefined
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("email is missing");
  });

  it("Invalid email", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      email: 1111
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid email");
  });

  it("password is missing", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      password: undefined
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("password is missing");
  });

  it("Invalid email", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      password: 1234
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid password");
  });

  it("password is 3 character", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      password: "123"
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("password must be 4 - 255 character long");
  });

  it("password is 256 character", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      password: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("password must be 4 - 255 character long");
  });

  it("name is missing", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      name: undefined
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("name is missing");
  });

  it("Invalid name", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      name: 1234
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid name");
  });

  it("description is missing", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      description: undefined
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("description is missing");
  });

  it("Invalid description", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      description: 4243
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid description");
  });

  it("description is 201 character", async () => {
    const res = await request(app).post(`${baseUrl}/signUp`).send({
      ...signUpTestData,
      description: "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    });

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("description must be 0 - 200 character long");
  });

});
