const { DataTypes, QueryInterface } = require("sequelize");
const { Sequelize, sequelize } = require("./db");

// TODO - define the Band model
let Band = sequelize.define("Band", {
  name: DataTypes.STRING,
  genre: DataTypes.STRING,
  showCount: DataTypes.NUMBER,
});

module.exports = {
  Band,
};
