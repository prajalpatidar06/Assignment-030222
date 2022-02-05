const { Router } = require("express");
const {
  createAdmin,
  loginAdmin,
  addNewProduct,
  updateProductPrice,
  deleteProduct,
} = require("../controllers/admin");
const AuthToken = require("../utils/adminAuth");
const genToken = require("../utils/genToken");
const {
  validateRegisterData,
  validateProductDetails,
} = require("../utils/validators");
const route = Router();

route.post("/register", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    key: req.body.key,
  };
  const { error, valid } = validateRegisterData(user);
  if (!valid) return res.status(400).json(error);
  createAdmin(user.username, user.password).then((data) => {
    res.json(data);
  });
});

route.post("/login", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  return loginAdmin(user.username, user.password).then((data) => {
    if (data !== null) {
      let token = genToken(data);
      res.json(token);
    } else {
      return res.json({ error: "Wrong credential" });
    }
  });
});

// get products desboard
route.get("/", AuthToken, (req, res) => {
  res.json("authenticated");
});

// add new product
route.post("/", AuthToken, (req, res) => {
  data = {
    name: req.body.name,
    price: req.body.price,
  };
  const { error, valid } = validateProductDetails(data);
  if (!valid) return res.status(400).json(error);
  addNewProduct(data.name, parseFloat(data.price)).then((val) => {
    res.json(val);
  });
});

// update product details
route.put("/", AuthToken, (req, res) => {
  data = {
    name: req.body.name,
    price: req.body.price,
  };
  const { error, valid } = validateProductDetails(data);
  if (!valid) return res.status(400).json(error);
  updateProductPrice(data.name, parseFloat(data.price)).then((val) => {
    res.json(val);
  });
});

// delete product
route.delete("/", AuthToken, (req, res) => {
  if(req.body.name === undefined) return res.status(400).json({error:"invalid data parameter"})
  deleteProduct(req.body.name).then((val) => {
    res.json(val);
  });
});

module.exports = {
  AdminRoute: route,
};
