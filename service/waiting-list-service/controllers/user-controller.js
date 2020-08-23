const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const { signToken } = require("../helpers/jwt");
const { ObjectID } = require("mongodb");
const { validateRegister, validateUpdate } = require("../helpers/validateUser");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, dob, email, password, phoneNumber } = req.body;
      const collection = req.userCollection;

      let checkRegister = await validateRegister(req.body);

      if (checkRegister[0] === false) {
        const newUser = await collection.insertOne({
          name,
          dob, // format yyyy-mm-dd
          email,
          password: hashPassword(password),
          phoneNumber,
          role: "user",
        });
        res.status(201).json({
          message: "successfully created new user",
          name,
          email,
        });
      } else {
        next({ name: "400 Bad Request", error: checkRegister[1] });
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const collection = req.userCollection;

      const response = await collection.findOne({
        email: email,
      });

      if (response) {
        if (comparePassword(password, response.password)) {
          let token = signToken({
            id: response._id,
            email: email,
            role: response.role,
          });
          res.status(200).json({ access_token: token });
        } else {
          next({ name: "401 Unauthorized", error: "Invalid email/password" });
        }
      } else {
        next({ name: "401 Unauthorized", error: "Invalid email/password" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const { name, dob, phoneNumber } = req.body;
      const collection = req.userCollection;

      const checkUpdate = await validateUpdate(req.body);

      if (checkUpdate[0] === false) {
        const updateUser = await collection.updateOne(
          { _id: ObjectID(id) },
          {
            $set: {
              name: name,
              dob: dob,
              phoneNumber: phoneNumber,
            },
          }
        );
        res.status(200).json({ message: "successfully updated user" });
      } else {
        next({ name: "400 Bad Request", error: checkUpdate[1] });
      }
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const collection = req.userCollection;

      const users = await collection.find().toArray();
      res.status(200).json({ users: users });
    } catch (error) {
      next(error);
    }
  }

  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const collection = req.userCollection;

      const response = await collection.findOne({
        email: email,
      });

      if (response) {
        if (comparePassword(password, response.password)) {
          if (response.role === "admin") {
            let token = signToken({
              id: response._id,
              email: email,
              role: response.role,
            });
            res.status(200).json({ access_token: token });
          } else {
            next({ name: "403 Forbidden", error: "Admin access required" });
          }
        } else {
          next({ name: "401 Unauthorized", error: "Invalid email/password" });
        }
      } else {
        next({ name: "401 Unauthorized", error: "Invalid email/password" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
