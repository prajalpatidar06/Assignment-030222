const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { db } = require("./database/models");
const { AdminRoute } = require("./routes/admin");
const { UserRoute } = require("./routes/users");
app.use(express.json());

app.use("/", UserRoute);
app.use("/admin", AdminRoute);

db.sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(() => {
    console.error(new Error("Could not start server"));
    console.error(err);
  });
