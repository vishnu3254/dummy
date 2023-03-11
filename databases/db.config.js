// import sequelize
const { Sequelize } = require("sequelize");
// import mysql2
const mysql = require("mysql2");
// dotenv
require("dotenv").config();

// create instance for sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
