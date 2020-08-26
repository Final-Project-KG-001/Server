const request = require("supertest");
const app = require("../app");

describe("POST /appointment/", () => {
  const testData = {
    doctorId: "5f4328be1b030f1f046bb5ab",
    queueNumber: 2,
  };
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QwMjY2NzQ4ZTIyM2E5NGRhMzdlYSIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpYXQiOjE1OTc4NDI4MDd9.e-GGocKlVpJkG601frFpuO0AVLcUnwD8pCEZwDDGFPU"

  test("201 Success Create - Should return message, user ID, doctor ID, queue number, created at", (done) => {
    request(app)
      .post("/appointment")
      .send(testData)
      .set("Accept", "application/json")
      .set("access_token", token)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(201);
        expect(body).toHaveProperty(
          "message",
          "successfully created new queue"
        );
        expect(body).toHaveProperty("userId", expect.any(String));
        expect(body).toHaveProperty("doctorId", expect.any(String));
        expect(body).toHaveProperty("queueNumber", testData.queueNumber);
        expect(body).toHaveProperty("status", "waiting");
        expect(body).toHaveProperty("createdAt", expect.any(String));
        expect(body).toHaveProperty("_id", expect.any(String));

        expect(body.doctor[0]).toHaveProperty("_id", expect.any(String));
        expect(body.doctor[0]).toHaveProperty("name", expect.any(String));
        expect(body.doctor[0]).toHaveProperty("polyclinic", expect.any(String));

        expect(body.user[0]).toHaveProperty("_id", expect.any(String));
        expect(body.user[0]).toHaveProperty("name", expect.any(String));
        expect(body.user[0]).toHaveProperty("dob", expect.any(String));
        expect(body.user[0]).toHaveProperty("email", expect.any(String));
        expect(body.user[0]).toHaveProperty("password", expect.any(String));
        expect(body.user[0]).toHaveProperty("phoneNumber", expect.any(String));
        expect(body.user[0]).toHaveProperty("role", expect.any(String));

        done();
      });
  });

  test("400 Failed Create - empty doctor ID -  Should return error message", (done) => {
    request(app)
    .post("/appointment")
    .send({
        doctorId: "",
        queueNumber: testData.queueNumber
    })
    .set("Accept", "application/json")
    .set("access_token", token)
    .end((err, res) => {
      if (err) throw err;

      const { body, status } = res;

      expect(status).toBe(400);
      expect(body).toHaveProperty("error", "Doctor ID cannot be empty!");

      done();
    });
  });

  test("401 Failed Create - failed authentication -  Should return error message", (done) => {
    request(app)
    .post("/appointment")
    .send(testData)
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
