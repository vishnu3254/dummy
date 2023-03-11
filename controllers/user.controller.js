// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import bcryptjs
const bcryptjs = require("bcryptjs");

// import jwt
const jwt = require("jsonwebtoken");

// import Employee Model
const { Employee } = require("../models/employee.model");

// import user model
const { User } = require("../models/user.model");

const registerUser = expressAsyncHandler(async (req, res) => {
  // get the body from request
  let { userId, email, username, password } = req.body;

  // check the user is existed in our company database or not
  let userExistenceInWal = await Employee.findOne({
    where: {
      empId: userId,
    },
  });

  // if the user is not existed in our company then restrict the resgitration process
  if (userExistenceInWal == undefined) {
    res.send({
      message: "Unauthorized access You are not belongs to this company",
    });
  }

  // if the user existed in company database
  else {
    // check if the employee already exists with that email
    let userRecord = await User.findOne({
      where: {
        email: email,
      },
    });

    // if user found already
    if (userRecord != undefined) {
      res.send({ message: "User already found with that email" });
    }

    // if user not exists insert the data into the database
    else {
      // hash the password
      let hashedPassword = await bcryptjs.hash(password, 6);
      req.body.password = hashedPassword;
      await User.create(req.body);
      res.send({ message: "User Registered" });
    }
  }
});

// user Login
const loginUser = expressAsyncHandler(async (req, res) => {
  // get the userId and password from body
  let { userId, password } = req.body;
  // check the user existence using userId
  let userRecord = await User.findOne({
    where: {
      userId: userId,
    },
  });
  // if user not found
  if (userRecord == undefined) {
    res.send({ message: `User not found with id ${userId}` });
  }
  // if user found check password
  else {
    let checkPassword = await bcryptjs.compare(
      password,
      userRecord.dataValues.password
    );
    // if password not matched
    if (!checkPassword) {
      res.send({ message: "Incorrect password" });
    } else {
      // create a jwt token
      let signedToken = jwt.sign(
        {
          userId: userRecord.dataValues.userId,
          userRole: userRecord.dataValues.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "10d",
        }
      );
      res.send({ message: "Login successfull", payload: signedToken });
    }
  }
});

// export controllers
module.exports = { registerUser, loginUser };
