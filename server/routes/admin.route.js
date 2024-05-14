const express = require("express");

const auth = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");

const adminRoute = express.Router();

adminRoute.get("/reports", auth(["admin"]), adminController.getReports);
adminRoute.get("/charts", auth(["admin"]), adminController.getCharts);

module.exports = adminRoute;
