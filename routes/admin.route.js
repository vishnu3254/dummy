// create admin mini express application
const express = require("express");
const adminApp = express.Router();

// import verifyAdminToken
const verifyAdminToken = require("../middlewares/verifyAdminToken");

// import admin controllers
const {
  getProjects,
  getSpecificProjectDetails,
  createProject,
} = require("../controllers/admin.controller");

// routes for admin after login

// get all projects on clicking portfolioDashboard
adminApp.get("/admin/portfolioDashboard", verifyAdminToken, getProjects);

// get specific project details by clicking on specific project
adminApp.get(
  "/admin/portfolioDashboard/:projectId",
  verifyAdminToken,
  getSpecificProjectDetails
);

// create project
adminApp.post("/admin/project", verifyAdminToken,createProject);

// export adminApi
module.exports = adminApp;
