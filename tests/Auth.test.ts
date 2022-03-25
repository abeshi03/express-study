/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../src";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { UserResponse } from "../src/interfaces/serializers/UserSerializer";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { userTest } from "./User.test";

const baseUrl = "/auth";

describe("POST /signIn", () => {

  it("Should signIn", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`).send({
      email: "password@password5.com",
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
