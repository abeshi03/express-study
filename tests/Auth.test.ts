/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../src";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { UserResponse } from "../src/interfaces/serializers/UserSerializer";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { userTest } from "./User.test";

const baseUrl = "/auth";

describe("POST /signIn", () => {

  it("Success!!", async () => {
    const res = await request(app).post(`${baseUrl}/signIn`, ).send({
      email: "password@password5.com",
      password: "password"
    });

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");

    const user: UserResponse = res.body.data;

    userTest(user);
  });

});
