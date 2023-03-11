// import sequelize from dbconfig
const sequelize = require("../databases/db.config");

const { DataTypes } = require("sequelize");
// employee model
const { Employee } = require("./employee.model");
// create schema/model for employee

exports.User = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmail(email) {
          let emailDomain = email.slice(-18);
          console.log(emailDomain);
          if (emailDomain != "@westagilelabs.com") {
            throw new Error("only westagilelabs allowed");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
