const request = require("supertest");
const app = require("../app");

describe.only(`GET /general - Read all general clinic's queue`, () => {
  test(`200 Success GET General - Should return all general clinic's queue`, (done) => {
    request(app)
      .get("/general")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        done();
      });
  });

  test(`401 Fail GET General - Should not return all general clinic's queue if not login`, (done) => {
    request(app)
      .get("/general")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Failed to authenticate");
        done();
      });
  });
});

describe(`POST /general - Create new general clinic's queue`, () => {
  test(`201 Success POST General - Should create new general clinic's queue`, (done) => {
    request(app)
      .post("/general")
      .send({
        userId: "A1",
        doctorId: "B1",
        urutan: 1,
        status: "Active",
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("userId", "A1");
        expect(body).toHaveProperty("doctorId", "B1");
        expect(body).toHaveProperty(urutan, 1);
        expect(body).toHaveProperty(status, "Active");
        done();
      });
  });

  test(`401 Fail POST General - Should not create new general clinic's queue if not login`, (done) => {
    request(app)
      .post("/general")
      .send({
        userId: "A1",
        doctorId: "B1",
        urutan: 1,
        status: "Active",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Failed to authenticate");
        done();
      });
  });
});

describe(`DELETE /general - Delete general clinic's queue`, () => {
  test(`200 Success DELETE General`, (done) => {
    request(app)
      .delete("/general" + appointmentId)
      .set("access_token", access_token)
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

  test(`401 Fail DELETE General - Should not delete general clinic's queue`, (done) => {
    request(app)
      .delete("/general" + appointmentId)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Failed to authenticate");
        done();
      });
  });

  test(`404 Fail DELETE General - Should not delete general clinic's queue if appointment not found`, (done) => {
    request(app)
      .delete("/general" + 0)
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Appointment not found");
        done();
      });
  });
});