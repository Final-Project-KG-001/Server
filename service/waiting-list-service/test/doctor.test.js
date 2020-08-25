const request = require("supertest");
const app = require("../app");

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2UxZWFhZGI3ZGJiMWM4MDlkZmQ2NiIsImVtYWlsIjoidXNlcjRAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU5NzkwNjkwOX0.qFCC1Yz3EIiDulCXuuDTuP1gmNJ0BpbRBLAs9kY364U"

// describe('POST /doctor - Create a new doctor', () => {
//     const newDoctor = {
//         name: 'Sammy',
//         polyclinic: 'Dokter Umum'
//     };

//     test('201 Success POST Doctor - Should create a new doctor', (done) => {
//         const { name, polyclinic } = newDoctor;
//         request(app)
//             .post('/doctor')
//             .send(newDoctor)
//             .set('access_token', access_token)
//             .then(response => {
//                 const { body, status } = response;
//                 expect(status).toBe(201);
//                 done();
//             })
//             .catch(err => {
//                 done(err);
//             })
//     })
// });

describe("GET /doctor - Read all doctors", () => {
  test("200 Success GET Doctor - Should return all doctors", (done) => {
    request(app)
      .get("/doctor")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        // const exampleData = body[0];
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        // expect(exampleData).toBeInstanceOf(Object);
        // expect(exampleData).toHaveProperty('name');
        // expect(exampleData).toHaveProperty('polyclinic');
        done();
      });
  });

  test("401 Fail GET Doctor - Should not return all doctors if not login", (done) => {
    request(app)
      .get("/doctor")
      .set("access_token", "")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Failed to authenticate");
        done();
      });
  });
});