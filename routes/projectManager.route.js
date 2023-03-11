// create projectManagerApp express mini application
const express = require("express");
const projectManagerApp = express.Router();

// import controllers
const {
  projectUpdate,
  raiseProjectConcern,
} = require("../controllers/projectManager.controller");

// Routes for projectManager

// projectUpdates by projectManager
projectManagerApp.post("/projectManager/projectUpdates", projectUpdate);

// Raise project concerns by project Manager
projectManagerApp.post("/projectManager/projectConcern", raiseProjectConcern);

// exports
module.exports = projectManagerApp;
