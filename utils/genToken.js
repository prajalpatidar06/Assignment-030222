const config = require("./config");
const jwt = require("jsonwebtoken");

module.exports = (user) => {
  let data = {
    username: user.username,
    id: user.id,
  };
  const accessToken = jwt.sign(data, config.ACCESS_TOKEN_SECRET.toString());
  return accessToken;
};
