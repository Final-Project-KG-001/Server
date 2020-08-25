const request = require("supertest");
const app = require("../app");

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2UxZWFhZGI3ZGJiMWM4MDlkZmQ2NiIsImVtYWlsIjoidXNlcjRAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU5NzkwNjkwOX0.qFCC1Yz3EIiDulCXuuDTuP1gmNJ0BpbRBLAs9kY364U"
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QyYzU3ZmRiNWVkOTJiNGZlNWVlMCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTgzMjcwNzl9.4N5yPnq9LiTjmt9x8gJdkbZvCsfd8t0pt89EUdmT7Ac"
const dentalId = "5f4486f83d924628748542b5"

describe(`GET /dental - Read all dental clinic's queue`, () => {

  test(`200 Success GET Dental - Should return all dental clinic's queue`, (done) => {
    request(app)
      .get("/dental")
      .set("access_token", userToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        done();
      });
  });

  test(`401 Fail GET Dental - Should not return all dental clinic's queue if not login`, (done) => {
    request(app)
      .get("/dental")
      .set("access_token", "")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Failed to authenticate");
        done();
      });
  });
});

describe(`POST /dental - Create new dental clinic's queue`, () => {
  test(`201 Success POST Dental - Should create new dental clinic's queue`, (done) => {
    request(app)
      .post("/dental")
      .send({
        appointmentId: "5f3e22dfc94d800bb497eedd"
      })
      .set("access_token", userToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("appointmentId", "5f3e22dfc94d800bb497eedd");
        expect(body).toHaveProperty("status", "201 Created");

        expect(body.appointment[0]).toHaveProperty("_id", expect.any(String));
        expect(body.appointment[0]).toHaveProperty("userId", expect.any(String));
        expect(body.appointment[0]).toHaveProperty("doctorId", expect.any(String));
        expect(body.appointment[0]).toHaveProperty("queueNumber", expect.any(Number));
        expect(body.appointment[0]).toHaveProperty("status", expect.any(String));
        done();
      });
  });

  test(`401 Fail POST Dental - Should not create new dental clinic's queue if not login`, (done) => {
    request(app)
      .post("/dental")
      .send({
        userId: "A1",
        doctorId: "B1",
        urutan: 1,
        status: "Active",
      })
      .set("access_token", "")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Failed to authenticate");
        done();
      });
  });
});

describe(`DELETE /dental - Delete dental clinic's queue`, () => {
  test(`200 Success DELETE Dental`, (done) => {
    request(app)
      .delete("/dental/" + dentalId)
      .set("access_token", adminToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("status", "200 OK");
        expect(body).toHaveProperty(
          "message",
          "Appointment have successfully removed from queue"
        );
        done();
      });
  });

  test(`401 Fail DELETE Dental - Should not delete dental clinic's queue`, (done) => {
    request(app)
      .delete("/dental/" + dentalId)
      .set("access_token", "")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Failed to authenticate");
        done();
      });
  });

  test(`403 Fail DELETE Dental - Forbidden - Should not delete dental clinic's queue`, (done) => {
    request(app)
      .delete("/dental/" + dentalId)
      .set("access_token", userToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("error", "Admin access required");
        done();
      });
  });

  const invalidDentalId = "5f4486f83d924628748540b0"

  test(`404 Fail DELETE Dental - Should not delete dental clinic's queue if appointment not found`, (done) => {
    request(app)
      .delete("/dental/" + invalidDentalId)
      .set("access_token", adminToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "Appointment not found");
        done();
      });
  });
});