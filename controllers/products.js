const { Products, db } = require("../database/models");

async function getAllProducts() {
  return Products.findAll()
    .then((products) => {
      return products;
    })
    .catch((err) => {
      console.log(err.code);
      return {};
    });
}

async function getProductById(_id) {
  return Products.findOne({ where: { id: _id } })
    .then((prod) => {
      if (prod !== null) {
        return prod;
      } else {
        return {};
      }
    })
    .catch((err) => {
      console.log(err.code);
      return {};
    });
}

// db.sync().then(()=>{
//     getAllProducts().then((p)=>{
//         console.log(p)
//     });
// });

module.exports = {
  getAllProducts,
  getProductById,
};
