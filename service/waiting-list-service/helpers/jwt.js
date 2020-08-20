const jwt = require("jsonwebtoken");

function signToken(payload) {
  let token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

async function verifyToken(token) {
  try {
    let payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signToken,
  verifyToken,
};
