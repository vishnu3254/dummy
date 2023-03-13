// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

//import nodemailer module
const nodemailer = require("nodemailer");

// dotenv
require("dotenv").config();

// import Project Model
const { Project } = require("../models/project.model");

// import projectUpdatesModel
const { ProjectUpdates } = require("../models/projectUpdates.model");

// import projectconcerns model
const { ProjectConcern } = require("../models/projectConcerns.model");

// import TeamComposition model
const { TeamComposition } = require("../models/teamComposition.model");

// For email triggering we use nodemailer module

//create connection to smtp
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD, // app password
  },
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

  //mail options for nodemailer
  let mailOptions = {
    from: "vishnuvardhanudagundla7@gmail.com",
    to: "vv50285@gmail.com",
    subject: `Project concern is raised for project ${req.body.projectId} by ${req.body.projectManager}`,
    text: `Hi Admin,
     A project concern is raised 
     Concern Description: ${req.body.concernDescription}
     severity:${req.body.severity} `,
  };

  // send email
  //send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send({ message: "Project Concern Raised...." });
});

// getProjectsForProjectManager
const getProjectsForProjectManager = expressAsyncHandler(async (req, res) => {
  // get the projectManagerId from url
  let projectManagerIdFromUrl = req.params.projectManagerId;
  // query to find all the projects under his maintanance
  let projectRecords = await Project.findAll({
    where: {
      projectManager: projectManagerIdFromUrl,
    },
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
  // if theere are no projects for projectManager
  if (projectRecords.length == 0) {
    res.send({ message: "Sorry You don't have any  projects" });
  }
  // if there are projects
  else {
    res.send({
      message: `All projects for ${projectManagerIdFromUrl}`,
      payload: projectRecords,
    });
  }
});

//getSpecificProjectDetails
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

// exports
module.exports = {
  projectUpdate,
  raiseProjectConcern,
  getProjectsForProjectManager,
  getSpecificProjectDetails,
};
