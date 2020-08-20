function validateRegister(data) {
  const { name, dob, email, password, phoneNumber } = data;
  let errorMessage = [];

  try {
    if (name === "" || name === null) {
      errorMessage.push("Name field cannot be empty!");
    } else if (typeof name !== "string") {
      errorMessage.push("Invalid name data type!");
    }

    const checkDate = new Date(dob);

    if (dob === "" || dob === null) {
      errorMessage.push("Date of birth field cannot be empty!");
    } else if (checkDate == "Invalid Date") {
      errorMessage.push("Invalid date of birth data type!");
    }

    if (email === "" || email === null) {
      errorMessage.push("Email field cannot be empty!");
    } else if (typeof email !== "string") {
      errorMessage.push("Invalid email data type!");
    }

    if (password === "" || password === null) {
      errorMessage.push("Password field cannot be empty!");
    }

    if (phoneNumber === "" || phoneNumber === null) {
      errorMessage.push("Phone number field cannot be empty!");
    } else if (Number.isInteger(JSON.parse(phoneNumber)) === false) {
      errorMessage.push("Invalid phone number data type!");
    }

    if (errorMessage.length > 0) {
      return [true, errorMessage];
    } else {
      return [false, ""];
    }
  } catch (error) {
    return [true, "Invalid data type!"];
  }
}

function validateUpdate(data) {
  const { name, dob, phoneNumber } = data;
  let errorMessage = [];

  try {
    if (name === "" || name === null) {
      errorMessage.push("Name field cannot be empty!");
    } else if (typeof name !== "string") {
      errorMessage.push("Invalid name data type!");
    }

    const checkDate = new Date(dob);

    if (dob === "" || dob === null) {
      errorMessage.push("Date of birth field cannot be empty!");
    } else if (checkDate == "Invalid Date") {
      errorMessage.push("Invalid date of birth data type!");
    }

    if (phoneNumber === "" || phoneNumber === null) {
      errorMessage.push("Phone number field cannot be empty!");
    } else if (Number.isInteger(JSON.parse(phoneNumber)) === false) {
      errorMessage.push("Invalid phone number data type!");
    }

    if (errorMessage.length > 0) {
      return [true, errorMessage];
    } else {
      return [false, ""];
    }
  } catch (error) {
    return [true, "Invalid data type!"];
  }
}

module.exports = {
  validateRegister,
  validateUpdate,
};
