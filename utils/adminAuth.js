const jwt = require("jsonwebtoken");
const { isValidAdmin } = require("../controllers/admin");
const config = require("./config");
module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json({ error: "unauthorized" });
  }
  jwt.verify(idToken, config.ACCESS_TOKEN_SECRET.toString(), (err, user) => {
    if (err) return res.json({ error: "token is expired or invalid" });
    isValidAdmin(user.username, user.id).then((isValid) => {
      if (isValid) {
        next();
      } else {
        return res.status(404).json({ error: "unauthorized access" });
      }
    });
  });
};
