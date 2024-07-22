const express = require("express");

const auth = require("../middlewares/auth.middleware");
const classController = require("../controllers/class.controller");

const classRoute = express.Router();

classRoute.get("/", auth(["admin", "teacher"]), classController.getAllClasses);

module.exports = classRoute;
