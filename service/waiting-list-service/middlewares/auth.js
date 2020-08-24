const { verifyToken } = require("../helpers/jwt");
const { ObjectID } = require("mongodb");

async function isAdmin(req, res, next) {
  try {
    if(req.currentUser.role !== "admin") {
      next({name: "403 Forbidden", error: "Admin access required" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function isUser(req, res, next) {
  try {
    if(req.currentUser.role !== "user") {
      next({name: "403 Forbidden", error: "User access required"});
    } else {
      next();
    }
  } catch (error) {
    next(error);
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
        next({ name: "401 Unauthorized", error: "Failed to authenticate" });
      }
    } else {
      next({ name: "401 Unauthorized", error: "Failed to authenticate" });
    }
  } catch (error) {
    next(error);
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
        next({ name: "403 Forbidden", error: "User unauthorized" });
      }
    } else {
      next({ name: "404 Not Found", error: "Data not found" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  isAdmin,
  isUser,
  authentication,
  authorization,
};
