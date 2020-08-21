const request = require("supertest");
const app = require("../app");

describe("PUT /appointment/:id", () => {
  const data = {
    status: "process",
  };

  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QwMjY2NzQ4ZTIyM2E5NGRhMzdlYSIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpYXQiOjE1OTc4NDI4MDd9.e-GGocKlVpJkG601frFpuO0AVLcUnwD8pCEZwDDGFPU";
  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QyYzU3ZmRiNWVkOTJiNGZlNWVlMCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTc5MjQzOTl9.ZibH8BvEaB778U8qDaA8YZKRpa_uC7OB4sWThqYcbr4";
  const id = "5f3e2246f26f5f6630cddef4";

  test("200 Success Update - Should return message and new status", (done) => {
    request(app)
      .put(`/appointment/${id}`)
      .send(data)
      .set("Accept", "application/json")
      .set("access_token", adminToken)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "successfully updated appointment"
        );
        expect(body).toHaveProperty("status", data.status);

        done();
      });
  });

  test("400 Bad Request - empty status - Should return error message", (done) => {
    request(app)
      .put(`/appointment/${id}`)
      .send({ status: "" })
      .set("Accept", "application/json")
      .set("access_token", adminToken)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(400);
        expect(body).toHaveProperty("error", "Invalid status");

        done();
      });
  });

  test("401 Unauthorized - failed authentication - Should return error message", (done) => {
    request(app)
      .put(`/appointment/${id}`)
      .send(data)
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

  test("403 Forbidden - require admin access - Should return error message", (done) => {
    request(app)
      .put(`/appointment/${id}`)
      .send(data)
      .set("Accept", "application/json")
      .set("access_token", userToken)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(403);
        expect(body).toHaveProperty("error", "Admin access required");

        done();
      });
  });

  test.only("404 Not Found - invalid id - Should return error message", (done) => {
    request(app)
      .put("/appointment/5f3e2246f26f5f6630cddef9")
      .send(data)
      .set("Accept", "application/json")
      .set("access_token", adminToken)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "Data not found");

        done();
      });
  });
});
