const request = require("supertest");
const app = require("../app");

describe("POST /user/login", () => {
  const testUser = {
    email: "user4@mail.com",
    password: "password4",
  };

  test("200 Success Login - Should return access token", (done) => {
    request(app)
      .post("/user/login")
      .send(testUser)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));

        done();
      });
  });
});
