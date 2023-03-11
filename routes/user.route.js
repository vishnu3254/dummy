// create userApp mini express application
const express = require("express");

const userApp = express.Router();

// import controllers from usercontroller
const { registerUser, loginUser } = require("../controllers/user.controller");

// register user
userApp.post("/user", registerUser);

// login user
userApp.post("/user/login", loginUser);

 

// export userApp
module.exports = userApp;
