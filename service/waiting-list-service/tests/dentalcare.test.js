// const request = require("supertest");
// const app = require("../app");

// describe(`GET /dental - Read all dental clinic's queue`, () => {
//   test(`200 Success GET Dental - Should return all dental clinic's queue`, (done) => {
//     request(app)
//       .get("/dental")
//       .set("access_token", access_token)
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(200);
//         expect(body).toBeInstanceOf(Array);
//         done();
//       });
//   });

//   test(`401 Fail GET Dental - Should not return all dental clinic's queue if not login`, (done) => {
//     request(app)
//       .get("/dental")
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Failed to authenticate");
//         done();
//       });
//   });
// });

// describe(`POST /dental - Create new dental clinic's queue`, () => {
//   test(`201 Success POST Dental - Should create new dental clinic's queue`, (done) => {
//     request(app)
//       .post("/dental")
//       .send({
//         userId: "A1",
//         doctorId: "B1",
//         urutan: 1,
//         status: "Active",
//       })
//       .set("access_token", access_token)
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(201);
//         expect(body).toBeInstanceOf(Object);
//         expect(body).toHaveProperty("userId", "A1");
//         expect(body).toHaveProperty("doctorId", "B1");
//         expect(body).toHaveProperty(urutan, 1);
//         expect(body).toHaveProperty(status, "Active");
//         done();
//       });
//   });

//   test(`401 Fail POST Dental - Should not create new dental clinic's queue if not login`, (done) => {
//     request(app)
//       .post("/dental")
//       .send({
//         userId: "A1",
//         doctorId: "B1",
//         urutan: 1,
//         status: "Active",
//       })
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Failed to authenticate");
//         done();
//       });
//   });
// });

// describe(`DELETE /dental - Delete dental clinic's queue`, () => {
//   test(`200 Success DELETE Dental`, (done) => {
//     request(app)
//       .delete("/dental" + appointmentId)
//       .set("access_token", access_token)
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(200);
//         expect(body).toHaveProperty("status", "200 OK");
//         expect(body).toHaveProperty(
//           "message",
//           "Appointment have successfully removed from queue"
//         );
//         done();
//       });
//   });

//   test(`401 Fail DELETE Dental - Should not delete dental clinic's queue`, (done) => {
//     request(app)
//       .delete("/dental" + appointmentId)
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Failed to authenticate");
//         done();
//       });
//   });

//   test(`404 Fail DELETE Dental - Should not delete dental clinic's queue if appointment not found`, (done) => {
//     request(app)
//       .delete("/dental" + 0)
//       .set("access_token", access_token)
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(404);
//         expect(body).toHaveProperty("message", "Appointment not found");
//         done();
//       });
//   });
// });
