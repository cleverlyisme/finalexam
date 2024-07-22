const express = require("express");

const auth = require("../middlewares/auth.middleware");
const teacherController = require("../controllers/teacher.controller");

const teacherRoute = express.Router();

teacherRoute.get("/", auth(["admin"]), teacherController.getAllTeachers);
teacherRoute.get("/:id", auth(["admin"]), teacherController.getTeacher);
teacherRoute.put("/:id", auth(["admin"]), teacherController.updateTeacher);
teacherRoute.post("/", auth(["admin"]), teacherController.createTeacher);
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
teacherRoute.delete("/:id", auth(["admin"]), teacherController.deleteTeacher);

module.exports = teacherRoute;
