const { Router } = require("express");
const { getAllProducts, getProductById } = require("../controllers/products");
const route = Router();

route.get("/", (req, res) => {
  getAllProducts().then((data) => {
    res.json(data);
  });
});

route.get("/product/:id", (req, res) => {
  let _id = parseInt(req.params.id);
  if (_id) {
    getProductById(_id).then((data) => {
      res.json(data);
    });
  } else {
    res.status(400).json({ error: "Id must be Integer value" });
  }
});

module.exports = {
  UserRoute: route,
};
