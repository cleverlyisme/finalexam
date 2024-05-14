const express = require("express");

const auth = require("../middlewares/auth.middleware");
const eventController = require("../controllers/event.controller");

const eventRoute = express.Router();

eventRoute.get("/lastest", eventController.getLastestEvents);
eventRoute.get("/", eventController.getAllEvents);
eventRoute.post("/", auth(["admin"]), eventController.createEvent);
eventRoute.get("/:id", eventController.getEvent);
eventRoute.put("/:id", eventController.updateEvent);
eventRoute.delete("/:id", auth(["admin"]), eventController.deleteEvent);

module.exports = eventRoute;
