const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt")

const access_token = signToken('fiah@mail.com')
const admin_token = signToken('admin@mail.com')
let getAppointmentId = ""

describe(`GET /general - Read all general clinic's queue`, () => {
  test(`200 Success GET General - Should return all general clinic's queue`, (done) => {
    request(app)
      .get("/general")
      .set({ access_token: access_token })
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

        expect(body).toHaveProperty("error", "Failed to authenticate");
        done();
      });
  });
});

describe(`POST /general - Create new general clinic's queue`, () => {
  test(`201 Success POST General - Should create new general clinic's queue`, (done) => {
    request(app)
      .post("/general")
      .set("access_token", access_token)
      .send({
        appointmentId: "5f44ac8eec44fe69c34ef82a"
      })
      .then((response) => {
        const { body, status } = response;

        getAppointmentId = body._id

        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Appointment have successfully added to queue");
        expect(body).toHaveProperty("status", "201 Created");
        done();
      });
  });

  test(`401 Fail POST General - Should not create new general clinic's queue if not login`, (done) => {
    request(app)
      .post("/general")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Failed to authenticate");
        done();
      });
  });

  test(`500 Fail POST General - Should not create new general clinic's`, (done) => {
    request(app)
      .post("/general")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty("error", { "message": "Internal Server Error" });
        done();
      });
  });

});

describe(`DELETE /general - Delete general clinic's queue`, () => {
  test(`200 Success DELETE General`, (done) => {
    request(app)
      .delete(`/general/${ getAppointmentId }`)
      .set("access_token", admin_token)
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
      .delete("/general/" + getAppointmentId)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Failed to authenticate");
        done();
      });
  });

  test(`404 Fail DELETE General - Should not delete general clinic's queue if appointment not found`, (done) => {
    request(app)
      .delete("/general/5f44affefcda6169d331c064")
      .set("access_token", admin_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "Appointment not found");
        done();
      });
  });

  test(`500 Fail DELETE General - Should not delete general clinic's queue`, (done) => {
    request(app)
      .delete("/general/5cjdcnjdcn")
      .set("access_token", admin_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty("error", { "message": "Internal Server Error" });
        done();
      });
  });
});
