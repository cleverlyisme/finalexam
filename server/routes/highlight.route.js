const express = require("express");

const auth = require("../middlewares/auth.middleware");
const highlightController = require("../controllers/highlight.controller");

const highlightRoute = express.Router();

highlightRoute.get("/lastest", highlightController.getLastestHighlights);
highlightRoute.get("/", highlightController.getAllHighlights);
highlightRoute.post("/", auth(["admin"]), highlightController.createHighlight);
highlightRoute.get("/:id", highlightController.getHighlight);
highlightRoute.put("/:id", highlightController.updateHighlight);
highlightRoute.delete(
  "/:id",
  auth(["admin"]),
  highlightController.deleteHighlight
);

module.exports = highlightRoute;
