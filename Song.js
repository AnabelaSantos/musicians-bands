const { DataTypes, QueryInterface } = require("sequelize");
const { Sequelize, sequelize } = require("./db");

// TODO - define the Song model
let Song = sequelize.define("Song", {
  title: DataTypes.STRING,
  year: DataTypes.NUMBER,
});

module.exports = {
  Song,
};
