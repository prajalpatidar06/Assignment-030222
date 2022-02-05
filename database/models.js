const Sequelize = require("sequelize");

const db = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: __dirname + "/store.sqlite",
});

const Admin = db.define("admin", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.DataTypes.STRING(40),
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: false,
  },
});

const Products = db.define("products", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING(40),
    allowNull: false,
  },
  price: {
    type: Sequelize.DataTypes.DOUBLE,
    default: 0,
  },
});

module.exports = {
  db,
  Admin,
  Products,
};
