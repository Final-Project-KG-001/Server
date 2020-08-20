const bcrypt = require("bcryptjs");

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(5);
  let hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
}

function comparePassword(inputPassword, database) {
  return bcrypt.compareSync(inputPassword, database);
}

module.exports = {
  hashPassword,
  comparePassword,
};
