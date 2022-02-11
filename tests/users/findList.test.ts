/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../../src";
import {UsersResponse} from "../../src/interfaces/serializers/UserSerializer";


describe("GET /users", () => {

  const url = "/users"

  it("成功の場合", async () => {

    const res = await request(app).get(`${url}?paginationPageNumber=1&itemsCountPerPaginationPage=1`);

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");
    expect(typeof res.body.data.totalItemsCount).toBe("number")
    expect(typeof res.body.data.itemsCountInSelection).toBe("number")
    // TODO
    expect(typeof res.body.data.users).toBe("object")
  });

  it("クエリパラメーターなしの場合", async () => {

    const res = await request(app).get(url);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("paginationPageNumber is missing");
  });

  it("paginationPageNumberがnumberでは無い場合", async () => {

    const res = await request(app).get(`${url}?paginationPageNumber=string`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid paginationPageNumber");
  })

  it("paginationPageNumberだけの場合", async () => {

    const res = await request(app).get(`${url}?paginationPageNumber=5`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("itemsCountPerPaginationPage is missing");
  });

});
