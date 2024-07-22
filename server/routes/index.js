const express = require("express");

const authRoute = require("./auth.route");
const classRoute = require("./class.route");
const teacherRoute = require("./teacher.route");
const scheduleRoute = require("./schedule.route");
const adminRoute = require("./admin.route");
const highlightRoute = require("./highlight.route");
const eventRoute = require("./event.route");
const informationRoute = require("./information.route");
// const uploadRoute = require("./upload.route");

const routes = express.Router();

routes.use("/auth", authRoute);
routes.use("/classes", classRoute);
routes.use("/teachers", teacherRoute);
routes.use("/admin", adminRoute);
routes.use("/highlights", highlightRoute);
routes.use("/events", eventRoute);
routes.use("/schedules", scheduleRoute);
routes.use("/informations", informationRoute);
// routes.use("/upload", uploadRoute);

module.exports = routes;
