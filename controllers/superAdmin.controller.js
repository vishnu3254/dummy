// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import user controller
const {User} = require("../models/user.model")

const roleMapping = expressAsyncHandler(async (req, res) => {
  // get the role and userId
  let { userId, role } = req.body;
  // check the user
  let userRecord = await User.findOne({
    where: {
      userId: userId,
    },
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
    res.send({ message: `Role is mapped to id ${userId}` });
  }
});

// exports
module.exports = roleMapping;
