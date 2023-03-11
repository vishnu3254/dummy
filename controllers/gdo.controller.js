// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import TeamCompostion Model
const { TeamComposition } = require("../models/teamComposition.model");

//import Employee Model
const { Employee } = require("../models/employee.model");

// import ResourcingRequest model
const { ResourcingRequest } = require("../models/resourcingRequest.model");

// Association between TeamCoposition and Employee(one-many)
TeamComposition.Employee = TeamComposition.hasMany(Employee, {
  foreignKey: "projectId",
});

// Assigning projects
const assignProject = expressAsyncHandler(async (req, res) => {
  // insert the data into the Team Composition model
  await TeamComposition.create(req.body);
  res.send({ message: "Project assigned to Employee" });
});

// rasieResourcingRequest
const rasieResourcingRequest = expressAsyncHandler(async (req, res) => {
  // insert the data into resourcingRequest model
  await ResourcingRequest.create(req.body);
  res.send({ message: "resourcing request raised" });
});

// exports
module.exports = { assignProject, rasieResourcingRequest };
