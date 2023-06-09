// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import Project model
const { Project } = require("../models/project.model");

// import projectUpdatesModel
const { ProjectUpdates } = require("../models/projectUpdates.model");

// import projectconcern Model
const { ProjectConcern } = require("../models/projectConcerns.model");

// import Team composition model
const { TeamComposition } = require("../models/teamComposition.model");

// Association between Project and ProjectUpdates (one-to-many)
Project.ProjectUpdates = Project.hasMany(ProjectUpdates, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Association between Project and Project Concern (one-to-many)
Project.ProjectConcern = Project.hasMany(ProjectConcern, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Association between project and team composition model (one-to-many)
Project.TeamComposition = Project.hasMany(TeamComposition, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// create project by admin
const createProject = expressAsyncHandler(async (req, res) => {
  // insert the data from body to project model
  await Project.create(req.body);
  res.send({ message: "Project Created" });
});

// get projects
const getProjects = expressAsyncHandler(async (req, res) => {
  let projects = await Project.findAll({
    attributes: {
      exclude: [
        "projectId",
        "gdoId",
        "projectManager",
        "hrManager",
        "domain",
        "typeOfProject",
      ],
    },
  });
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

  // query to get the particular projectId and its project updates and project concerns by associations
  let projectRecord = await Project.findOne({
    where: {
      projectId: projectIdFromUrl,
    },

    include: [
      {
        association: Project.ProjectUpdates,
      },

      {
        association: Project.ProjectConcern,
      },
      {
        association: Project.TeamComposition,
      },
    ],
  });

  // return project fitness, concern indicator ,Team members get these values from projectRecord
  let projectFitness = projectRecord.dataValues.overAllProjectFitnessIndicator;
  // find team size
  let teamSize = projectRecord.dataValues.employeeProjectDetails.length;
  // find number of concerns is active
  let concernIndicator = 0;
  projectRecord.dataValues.projectConcerns.forEach((concern) => {
    if (concern.statusOfConcern == "pending") concernIndicator++;
  });
  // send response
  res.send({
    message: `Project Detaitls for projectId ${projectIdFromUrl}`,
    projectFitness: projectFitness,
    teamSize: teamSize,
    concernIndicator: concernIndicator,
    payload: projectRecord,
  });
});

// update existing project
const updateProject = expressAsyncHandler(async (req, res) => {
  //  query to update
  let updatedRecord = await Project.update(req.body, {
    where: {
      projectId: req.body.projectId,
    },
  });
  // check if project is updated correctly or not
  if (updatedRecord == 0) {
    res.send({ message: "Project not updated.." });
  } else {
    res.send({ message: "Project Updated.." });
  }
});

// Delete project
const deleteProject = expressAsyncHandler(async (req, res) => {
  // query to delete the project here i am doing hard delete
  let deletedRecord = await Project.destroy({
    where: {
      projectId: req.params.projectId,
    },
  });
  // if deletedRecord is 0 then project is not deleted
  if (deleteProject == 0) {
    res.send({ message: "Unable to delete the project" });
  } else {
    res.send({ message: "Project deleted successfully.." });
  }
});

// export controllers
module.exports = {
  getProjects,
  getSpecificProjectDetails,
  createProject,
  updateProject,
  deleteProject,
};
