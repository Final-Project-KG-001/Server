const request = require("supertest");
const app = require("../app");

describe("POST /user/register", () => {
  const testUser = {
      name: "user1",
      dob: "2000-10-10",
      email: "user1@mail.com",
      password: "password1",
      phoneNumber: "621789123"
  };

  test("201 Success Create - Should return message, name, email", (done) => {
    request(app)
      .post("/user/register")
      .send(testUser)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(201);
        expect(body).toHaveProperty("message", "successfully created new user");
        expect(body).toHaveProperty("name", testUser.name);
        expect(body).toHaveProperty("email", testUser.email);

        done();
      });
  });

//   test("400 Failed Create - empty name, dob, email, password, phone number field -  Should return error message", (done) => {})
//   test("400 Failed Create - invalid dob -  Should return error message", (done) => {})
//   test("400 Failed Create - invalid phone number -  Should return error message", (done) => {})

});
