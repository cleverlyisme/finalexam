const express = require("express");

const auth = require("../middlewares/auth.middleware");
const informationController = require("../controllers/information.controller");

const informationRoute = express.Router();

informationRoute.get(
  "/transcript/latest",
  auth(),
  informationController.getStudentTranscriptLatestSemester
);
informationRoute.get(
  "/fees/latest",
  auth(),
  informationController.getStudentLatestFees
);

module.exports = informationRoute;
