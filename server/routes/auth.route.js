const express = require("express");

const auth = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/login", authController.login);
authRoute.get("/check", auth(), authController.checkAuth);

module.exports = authRoute;
