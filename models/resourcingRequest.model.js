// import sequelize from dbconfig
const sequelize = require("../databases/db.config");
const { DataTypes } = require("sequelize");

// import User model
const { User } = require("../models/user.model");

// import Project model
const { Project } = require("../models/project.model");

// create schema for resourcing request
exports.ResourcingRequest = sequelize.define(
  "resourcingRequests",
  {
    gdoId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "projectId",
      },
    },
    requestDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
