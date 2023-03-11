// create gdoApp express mini application
const express = require("express");
const gdoApp = express.Router();

// import verifyGDOToken
const verifyGDOToken = require("../middlewares/verifyGDOToken");

// import controllers from gdo

const {
  assignProject,
  rasieResourcingRequest,
} = require("../controllers/gdo.controller");

// Routes for GDO

// Assign project to employees
gdoApp.post("/gdo/projectTeam", verifyGDOToken, assignProject);

// raise resourcing request by gdo
gdoApp.post("/gdo/resourcingRequest", verifyGDOToken, rasieResourcingRequest);

// exports
module.exports = gdoApp;
