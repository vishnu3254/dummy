// import sequelize from dbcoonfig
const sequelize = require("../databases/db.config");
const { DataTypes } = require("sequelize");

// create schema/model for team

exports.Employee = sequelize.define(
  "employees",
  {
    empId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    empName: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
