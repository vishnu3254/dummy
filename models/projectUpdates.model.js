// import sequelize from dbconfig
const sequelize = require("../databases/db.config");
const { DataTypes } = require("sequelize");

// import project model
const { Project } = require("./project.model");

// user model
const { User } = require("./user.model");

// create project update schema
exports.ProjectUpdates = sequelize.define(
  "projectUpdates",
  {
    projectId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Project,
      //   key: "projectId",
      // },
    },
    projectManager: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    date: {
      type: DataTypes.DATE,
    },
    projectStatusUpdate: {
      type: DataTypes.STRING,
    },
    scheduleStatus: {
      type: DataTypes.STRING,
    },
    resourcingStatus: {
      type: DataTypes.STRING,
    },
    qualityStatus: {
      type: DataTypes.STRING,
    },
    waitingForClient: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
