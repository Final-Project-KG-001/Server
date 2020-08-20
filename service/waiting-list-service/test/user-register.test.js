const request = require("supertest");
const app = require("../app");

describe("POST /user/register", () => {
  const testUser = {
    name: "user1",
    dob: "2000-10-10",
    email: "user1@mail.com",
    password: "password1",
    phoneNumber: "621789123",
  };

  test("201 Success Create - Should return message, name, email", (done) => {
    request(app)
      .post("/user/register")
      .send(testUser)
      .set("Accept", "application/json")
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

  const emptyUser = {
    name: "",
    dob: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  test("400 Failed Create - empty name, dob, email, password, phone number field -  Should return error message", (done) => {
    request(app)
      .post("/user/register")
      .send(emptyUser)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) throw err;
        const { body, status } = res;

        expect(status).toBe(400);
        expect(body.error).toEqual(
          expect.arrayContaining(["Name field cannot be empty!"])
        );
        expect(body.error).toEqual(
          expect.arrayContaining(["Date of birth field cannot be empty!"])
        );
        expect(body.error).toEqual(
          expect.arrayContaining(["Email field cannot be empty!"])
        );
        expect(body.error).toEqual(
          expect.arrayContaining(["Password field cannot be empty!"])
        );
        expect(body.error).toEqual(
          expect.arrayContaining(["Phone number field cannot be empty!"])
        );

        done();
      });
  });

  test("400 Failed Create - invalid dob -  Should return error message", (done) => {
    request(app)
      .post("/user/register")
      .send({
        name: testUser.name,
        dob: "abc",
        email: testUser.email,
        password: testUser.password,
        phoneNumber: testUser.phoneNumber,
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) throw err;
        const { body, status } = res;

        expect(status).toBe(400);
        expect(body.error).toEqual(
          expect.arrayContaining(["Invalid date of birth data type!"])
        );

        done();
      });
  });

  test.only("400 Failed Create - invalid phone number -  Should return error message", (done) => {
    request(app)
      .post("/user/register")
      .send({
        name: testUser.name,
        dob: testUser.dob,
        email: testUser.email,
        password: testUser.password,
        phoneNumber: "nomorhape",
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) throw err;
        const { body, status } = res;

        expect(status).toBe(400);
        expect(body).toHaveProperty("error", "Invalid data type!");

        done();
      });
  });
});
