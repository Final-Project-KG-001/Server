const request = require("supertest");
const app = require("../app");

describe("PUT /user/:id", () => {
  const testData = {
    name: "updateName",
    dob: "2000-10-10",
    phoneNumber: "621789123",
  };

  const userId = "5f3d0266748e223a94da37ea"; //User 1
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QwMjY2NzQ4ZTIyM2E5NGRhMzdlYSIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpYXQiOjE1OTc4NDI4MDd9.e-GGocKlVpJkG601frFpuO0AVLcUnwD8pCEZwDDGFPU"
  
  test("200 Success Update - Should return successs message", (done) => {
    request(app)
      .put(`/user/${userId}`)
      .send(testData)
      .set("Accept", "application/json")
      .set("access_token", token)
      .end((err, res) => {
        if (err) throw err;

        const { body, status } = res;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "successfully updated user");

        done();
      });
  });

  const emptyData = {
    name: "",
    dob: "",
    phoneNumber: "",
  };

  test("400 Failed Update - empty name, dob, phone number field -  Should return error message", (done) => {
    request(app)
      .put(`/user/${userId}`)
      .send(emptyData)
      .set("Accept", "application/json")
      .set("access_token", token)
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
          expect.arrayContaining(["Phone number field cannot be empty!"])
        );

        done();
      });
  });

  test("400 Failed Update - invalid dob -  Should return error message", (done) => {
    request(app)
    .put(`/user/${userId}`)
    .send({
        name: testData.name,
        dob: "abc",
        phoneNumber: testData.phoneNumber,
      })
      .set("Accept", "application/json")
      .set("access_token", token)
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

  test("400 Failed Update - invalid phone number -  Should return error message", (done) => {
    request(app)
    .put(`/user/${userId}`)
    .send({
        name: testData.name,
        dob: testData.dob,
        phoneNumber: "nomorhape",
      })
      .set("Accept", "application/json")
      .set("access_token", token)
      .end((err, res) => {
        if (err) throw err;
        const { body, status } = res;

        expect(status).toBe(400);
        expect(body).toHaveProperty("error", "Invalid data type!");

        done();
      });
  });

  test("401 Failed Update - failed authentication -  Should return error message", (done) => {
    request(app)
    .put(`/user/${userId}`)
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
  })

  const otherUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QyN2IxZTY1MWE5MmM0NDlhODg4YyIsImVtYWlsIjoidXNlcjJAbWFpbC5jb20iLCJpYXQiOjE1OTc4NDMzODN9.VD8xJnjB9Hkjov6VozsX7VNsGOHoqHUsGQFuQsMzMa0"
  
  test("403 Failed Update - user unauthorized -  Should return error message", (done) => {
    request(app)
    .put(`/user/${userId}`)
    .send(testData)
    .set("Accept", "application/json")
    .set("access_token", otherUserToken)
    .end((err, res) => {
      if (err) throw err;

      const { body, status } = res;

      expect(status).toBe(403);
      expect(body).toHaveProperty("error", "User unauthorized");

      done();
    });
  })

  test.only("404 Failed Update - user not found -  Should return error message", (done) => {
    request(app)
    .put("/user/5f3d0266748e223a94da37ae")
    .send(testData)
    .set("Accept", "application/json")
    .set("access_token", token)
    .end((err, res) => {
      if (err) throw err;

      const { body, status } = res;

      expect(status).toBe(404);
      expect(body).toHaveProperty("error", "Data not found");

      done();
    });
  })

});
