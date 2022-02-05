const { Admin, Products } = require("../database/models");

async function createAdmin(_username, _password) {
  console.log("started");
  return Admin.findOne({ where: { username: _username } })
    .then((user) => {
      if (user === null) {
        return Admin.create({
          username: _username,
          password: _password,
        }).then(() => {
          return { message: "user created" };
        });
      } else {
        return { error: "username is already exists" };
      }
    })
    .catch((err) => {
      console.log(err);
      return { error: err.code };
    });
}

async function loginAdmin(_username, _password) {
  return Admin.findOne({
    where: { username: _username, password: _password },
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log({ error: err.code });
      return null;
    });
}

async function isValidAdmin(_username, _id) {
  return Admin.findOne({
    where: { username: _username, id: _id },
  })
    .then((user) => {
      if (user) {
        return true;
      } else {
        false;
      }
    })
    .catch((err) => {
      console.log({ error: err.code });
      return false;
    });
}

async function addNewProduct(_name, _price) {
  return Products.create({
    name: _name,
    price: _price,
  })
    .then(() => {
      return { message: "Product added successfuly" };
    })
    .catch((err) => {
      return { error: err.code };
    });
}

async function updateProductPrice(_name, _price) {
  return Products.update({ price: _price }, { where: { name: _name } })
    .then(() => {
      return { message: "Product Details update successfuly" };
    })
    .catch((err) => {
      return { error: err.code };
    });
}

async function deleteProduct(_name) {
  return Products.destroy({ where: { name: _name } });
}

module.exports = {
  createAdmin,
  loginAdmin,
  isValidAdmin,
  addNewProduct,
  updateProductPrice,
  deleteProduct,
};
