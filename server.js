// import express
const express = require("express");

// create express obj application
const app = express();

// dotenv
require("dotenv").config();

// import sequelize
const sequelize = require("./databases/db.config");

// import adminApp
const adminApp = require("./routes/admin.route");

// import userApp
const userApp = require("./routes/user.route");

// import superUserApp
const superAdminApp = require("./routes/superAdmin.route");

// import gdoApp
const gdoApp = require("./routes/gdo.route");

// import projectManagerApp
const projectManagerApp = require("./routes/projectManager.route")

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on ${port}...`));

// check sequelize connection
sequelize
  .authenticate()
  .then(() => console.log("DB CONNECTED..."))
  .catch((err) => console.log("DB FAILED..."));

// sync the sequelize
sequelize.sync({ alter: true });

// body parser
app.use(express.json());

// path middleware for superUser
app.use("/superUser-api", superAdminApp);

//path middleware for admin login
app.use("/admin-api", adminApp);

//path middleware for user
app.use("/user-api", userApp);

// path middleware for gdoApp
app.use("/gdo-api",gdoApp)

// path middleware for projectManager
app.use("/projectManager-api",projectManagerApp)




// invalid path
app.use("*", (req, res) => {
  res.send({ message: "Invalid path" });
});
// error handling middleware
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
