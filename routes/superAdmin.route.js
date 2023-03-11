//create superUserApp mini express application
const express = require("express");

const superAdminApp = express.Router();

// import verifySuperUserToken
const verifySuperAdminToken = require("../middlewares/verifySuperAdminToken");

// import controller
const roleMapping = require("../controllers/superAdmin.controller");

// Routes for superUserApp

superAdminApp.put("/user/role", verifySuperAdminToken, roleMapping);

// export superUserApp
module.exports = superAdminApp;
