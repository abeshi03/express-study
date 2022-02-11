/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import request from "supertest"
import app from "../../src";
import { UsersResponse } from "../../src/interfaces/serializers/UserSerializer";


describe("GET /users", () => {

  const baseUrl = "/users"
  const paginationPageNumber = 4;
  const itemsCountPerPaginationPage = 4;

  it("成功の場合", async () => {

    const res = await request(app).get(
      `${baseUrl}?paginationPageNumber=${paginationPageNumber}&itemsCountPerPaginationPage=${itemsCountPerPaginationPage}`
    );

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Success");
    expect(typeof res.body.data.totalItemsCount).toBe("number")
    expect(typeof res.body.data.itemsCountInSelection).toBe("number")
    // TODO
    expect(typeof res.body.data.users).toBe("object")

    const users: UsersResponse[] = res.body.data.users;
    expect(users.length).toBe(itemsCountPerPaginationPage)
  });

  it("クエリパラメーターなしの場合", async () => {

    const res = await request(app).get(baseUrl);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("paginationPageNumber is missing");
  });

  it("paginationPageNumberがnumberでは無い場合", async () => {

    const res = await request(app).get(`${baseUrl}?paginationPageNumber=string`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("Invalid paginationPageNumber");
  })

  it("itemsCountPerPaginationPageがない場合", async () => {

    const res = await request(app).get(`${baseUrl}?paginationPageNumber=5`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("itemsCountPerPaginationPage is missing");
  });

  it("itemsCountPerPaginationPageがnumberでは無い場合", async () => {

    const res = await request(app).get(`${baseUrl}?paginationPageNumber=1&itemsCountPerPaginationPage=string`);

    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual("invalid itemsCountPerPaginationPage");
  });

});
