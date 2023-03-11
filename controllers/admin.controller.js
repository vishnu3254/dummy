// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import Project model
const { Project } = require("../models/project.model");
// import User model
const { User } = require("../models/user.model");

// Association between user and project(One User{here User is GDO} can have many projects)
// User.Project = User.hasMany(Project,{foreignKey:"gdoId"})

// create project
const createProject = expressAsyncHandler(async (req, res) => {
  // insert the data from body to project model
  await Project.create(req.body);
  res.send({ message: "Project Created" });
});

// get projects
const getProjects = expressAsyncHandler(async (req, res) => {
  let projects = await Project.findAll();
  // if there are no projects
  if (projects.length == 0) {
    res.send({ message: "No Projects Available" });
  }
  // if there are projects display them
  else {
    res.send({ message: "All projects", payload: projects });
  }
});

// get specificProjectDetails
const getSpecificProjectDetails = expressAsyncHandler(async (req, res) => {
  // get the projectId from url
  let projectIdFromUrl = req.params.projectId;
  // query to get the particular projectId
});

// export controllers
module.exports = { getProjects, getSpecificProjectDetails, createProject };
