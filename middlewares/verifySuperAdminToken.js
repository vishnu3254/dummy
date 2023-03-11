// import expressAsycnHandler
const expressAsyncHandler = require("express-async-handler");

// import jwt
const jwt = require("jsonwebtoken");

// import dotenv
require("dotenv").config();

const verifySuperAdminToken = expressAsyncHandler(async (req, res, next) => {
  // get the token from header.authorization
  let bearerToken = req.headers.authorization;
  // if there is no bearer token
  if (bearerToken == undefined) {
    res.send({ message: "UnAuthorized access..." });
  }
  // if there is a token check validity
  else {
    let token = bearerToken.split(" ")[1];
    try {
      let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // check the role
      if (decodedToken.userRole == "superAdmin") {
        next();
      }
      // if user is not GDO-HEAD then no permission
      else {
        res.send({ message: "You have no Permission UnAuthorize Access" });
      }
    } catch (err) {
      res.send({ message: "Session Expires please login again!!" });
    }
  }
});

module.exports = verifySuperAdminToken;
