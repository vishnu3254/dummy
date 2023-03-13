// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import user controller
const { User } = require("../models/user.model");

//role mapping
const roleMapping = expressAsyncHandler(async (req, res) => {
  // get the role and userId
  let { userId, role } = req.body;
  // check the user
  let userRecord = await User.findOne({
    where: {
      userId: userId,
    },
    attributes:{
      exclude:['password']
    }
  });
  // if userRecord is empty means no user found
  if (userRecord == undefined) {
    res.send({ message: "User not found to assign the role" });
  }
  // if user found
  else {
    let updatedUserRecord = await User.update(
      { role: role },
      {
        where: {
          userId: userId,
        },
      }
    );
    res.send({ data: userRecord, message: `Role is mapped to id ${userId}` });
  }
});

// get All users
const getAllUsers = expressAsyncHandler(async (req, res) => {
  let userRecords = await User.findAll({
    attributes:{
      exclude:['password']
    }
  });
  res.send({ message: "All users", payload: userRecords });
});

// exports
module.exports = { roleMapping, getAllUsers };
