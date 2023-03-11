// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import Project Model
const { Project } = require("../models/project.model");

// import projectUpdatesModel
const { ProjectUpdates } = require("../models/projectUpdates.model");

// import projectconcerns model
const { ProjectConcern } = require("../models/projectConcerns.model");

// Association between Project and ProjectUpdates (one-to-many)
Project.ProjectUpdates = Project.hasMany(ProjectUpdates, {
  foreignKey: "projectId",
});

// Association between Project and Project Concern (one-to-many)
Project.ProjectConcern = Project.hasMany(ProjectConcern, {
  foreignKey: "projectId",
});

// projectUpdates updated by projectManager
const projectUpdate = expressAsyncHandler(async (req, res) => {
  // insert the data into projectupdates model
  await ProjectUpdates.create(req.body);
  res.send({ message: "ProjectUpdates created" });
});

// raise project concerns by project manager
const raiseProjectConcern = expressAsyncHandler(async (req, res) => {
  // insert data into project concern model
  await ProjectConcern.create(req.body);
  res.send({ message: "Project Concern Raised...." });
});

// exports
module.exports = { projectUpdate, raiseProjectConcern };
