const config = require("../utils/config");
function isEmpty(string) {
  if (string === undefined) return false;
  return string.trim() === "";
}

function validateRegisterData(data) {
  let error = {};
  if (
    data.password === undefined ||
    data.confirmPassword === undefined ||
    data.key === undefined ||
    data.username === undefined
  ) {
    return {
      error: { error: "invalid data" },
      valid: false,
    };
  }
  if (data.key !== config.SECRET_KEY) {
    error.key = "You have not Admin privalages to register.";
  }
  if (isEmpty(data.password) || data.password.length < 6) {
    error.password = "Password size must be between 6-15";
  }
  if (data.password != data.confirmPassword) {
    error.confirmPassword = "Password must match";
  }
  return {
    error,
    valid: Object.keys(error).length === 0 ? true : false,
  };
}

function validateProductDetails(data) {
  let error = {};
  if (data.name === undefined || data.price === undefined) {
    return {
      error: { error: "invalid data parameter" },
      valid: false,
    };
  }
  if (isEmpty(data.name)) error.product = "must not be empty";
  if (isNaN(parseFloat(data.price))) error.price = "must be number";
  return {
    error,
    valid: Object.keys(error).length === 0 ? true : false,
  };
}

module.exports = { validateRegisterData, validateProductDetails };
