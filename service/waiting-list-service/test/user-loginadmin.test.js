const request = require("supertest");
const app = require("../app");

describe("POST /user/loginadmin", () => {
  const adminUser = {
    email: "admin@mail.com",
    password: "admin",
  };

  test("200 Success Login - Should return access token", (done) => {
    request(app)
      .post("/user/loginadmin")
      .send(adminUser)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));

        done();
      });
  });

  const testUser = {
    email: "user4@mail.com",
    password: "password4",
  };

  test("401 Failed Login - Should return error message", (done) => {
    request(app)
      .post("/user/loginadmin")
      .send({
        email: testUser.email,
        password: "passwordsalah",
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Invalid email/password");

        done();
      });
  });

  test("403 Failed Forbidden - Should return error message", (done) => {
    request(app)
      .post("/user/loginadmin")
      .send(testUser)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(403);
        expect(body).toHaveProperty("error", "Admin access required");

        done();
      });
  });
});
