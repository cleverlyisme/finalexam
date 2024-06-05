const express = require("express");

const auth = require("../middlewares/auth.middleware");
const scheduleController = require("../controllers/schedule.controller");

const scheduleRoute = express.Router();

scheduleRoute.get("/class/:id", auth(), scheduleController.getScheduleByClass);
scheduleRoute.get("/teacher/:id", auth(["teacher", "admin"]), scheduleController.getScheduleByTeacher);

module.exports = scheduleRoute;
