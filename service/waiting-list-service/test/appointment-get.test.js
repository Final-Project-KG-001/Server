const request = require("supertest");
const app = require("../app");

describe("GET /appointment", () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QwMjY2NzQ4ZTIyM2E5NGRhMzdlYSIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpYXQiOjE1OTc4NDI4MDd9.e-GGocKlVpJkG601frFpuO0AVLcUnwD8pCEZwDDGFPU"

  test.only("200 Success Read - Should return appointments data", (done) => {
    request(app)
      .get("/appointment")
      .set("Accept", "application/json")
      .set("access_token", token)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(200);
        expect(body.appointments[0]).toHaveProperty("_id", expect.any(String));
        expect(body.appointments[0]).toHaveProperty("userId", expect.any(String));
        expect(body.appointments[0]).toHaveProperty("doctorId", expect.any(String));
        expect(body.appointments[0]).toHaveProperty("queueNumber", expect.any(Number));
        expect(body.appointments[0]).toHaveProperty("status", expect.any(String));

        done();
      });
  });

  test("401 Failed Read - failed authentication -  Should return error message", (done) => {
    request(app)
    .get("/appointment")
    .set("Accept", "application/json")
    .set("access_token", "")
    .end((err, res) => {
      if (err) throw err;

      const { body, status } = res;

      expect(status).toBe(401);
      expect(body).toHaveProperty("error", "Failed to authenticate");

      done();
    });
  });
});
