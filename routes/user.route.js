// create userApp mini express application
const express = require("express");

const userApp = express.Router();

// import controllers from usercontroller
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");

// register user
userApp.post("/user", registerUser);

// login user
userApp.post("/user/login", loginUser);

// forgot password
userApp.post("/user/forgotPassword", forgotPassword);

// reset password
userApp.post("/user/:email/resetPassword", resetPassword);

// export userApp
module.exports = userApp;
