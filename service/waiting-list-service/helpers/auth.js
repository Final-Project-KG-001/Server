const { verifyToken } = require("../helpers/jwt");
const { response } = require("express");
const { ObjectID } = require("mongodb");

async function adminAuthentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const collection = req.userCollection;

    if (access_token) {
      const payload = await verifyToken(access_token);
      const response = await collection.findOne({ email: payload.email });

      if (response.role === "admin") {
        next();
      } else {
        res.status(403).json({ message: "user cant read/modify this data!" });
      }
    } else {
      res.status(401).json({ message: "Authentication failed!" });
    }
  } catch (error) {
    throw error;
  }
}

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const collection = req.userCollection;

    if (access_token) {
      const payload = await verifyToken(access_token);
      const response = await collection.findOne({ email: payload.email });

      if (response) {
        req.currentUser = response;
        next();
      } else {
        res.status(401).json({ message: "please login first!" });
      }
    } else {
      res.status(401).json({ message: "please login first!" });
    }
  } catch (error) {
    throw error;
  }
}

async function authorization(req, res, next) {
  try {
    const userId = req.params.id;
    const { _id } = req.currentUser;
    const collection = req.userCollection;
    const response = await collection.findOne({ _id: ObjectID(userId) });

    if (response) {
      if (_id == userId) {
        next();
      } else {
        res
          .status(403)
          .json({ message: "you are unauthorized to read/modify this data!" });
      }
    } else {
      res.status(404).json({ message: "data not found!" });
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  adminAuthentication,
  authentication,
  authorization,
};
