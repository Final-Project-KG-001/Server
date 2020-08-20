const request = require("supertest");
const app = require("../app");

describe("GET /user/", () => {
  const adminUser = {
    email: "admin@mail.com",
    password: "admin",
  };

  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QyYzU3ZmRiNWVkOTJiNGZlNWVlMCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTc5MjQzOTl9.ZibH8BvEaB778U8qDaA8YZKRpa_uC7OB4sWThqYcbr4";

  test("200 Success Read - Should return users data", (done) => {
    request(app)
      .get("/user")
      .send(adminUser)
      .set("Accept", "application/json")
      .set("access_token", adminToken)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(200);
        expect(body.users[0]).toHaveProperty("_id", expect.any(String));
        expect(body.users[0]).toHaveProperty("name", expect.any(String));
        expect(body.users[0]).toHaveProperty("dob", expect.any(String));
        expect(body.users[0]).toHaveProperty("email", expect.any(String));
        expect(body.users[0]).toHaveProperty("password", expect.any(String));
        expect(body.users[0]).toHaveProperty("phoneNumber", expect.any(String));
        expect(body.users[0]).toHaveProperty("role", expect.any(String));

        done();
      });
  });

  test("401 Failed Aunthentication - Should return error message", (done) => {
    request(app)
      .get("/user")
      .send(adminUser)
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

  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2UxZWFhZGI3ZGJiMWM4MDlkZmQ2NiIsImVtYWlsIjoidXNlcjRAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU5NzkyNDcwMn0.aCXFfw5dwrVlers4ZXBOPlM3UYgSMuUrmjmfud8Cp8k";

  test.only("403 Failed Forbidden - Should return error message", (done) => {
    request(app)
      .get("/user")
      .send(adminUser)
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
});
