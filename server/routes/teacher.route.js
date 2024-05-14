const express = require("express");

const auth = require("../middlewares/auth.middleware");
const teacherController = require("../controllers/teacher.controller");

const teacherRoute = express.Router();

teacherRoute.get(
  "/students",
  auth(["teacher"]),
  teacherController.getStudentsOfMainClass
);
teacherRoute.get(
  "/students/date",
  auth(["teacher"]),
  teacherController.getStudentsOfMainClassByDate
);
teacherRoute.put(
  "/students/break",
  auth(["teacher"]),
  teacherController.markBreak
);

module.exports = teacherRoute;
