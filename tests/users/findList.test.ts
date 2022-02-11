/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../../src";

describe("GET /users", () => {

  const url = "/users"

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

})
