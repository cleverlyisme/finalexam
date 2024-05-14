const service = require("../services/highlight.service");

const getAllHighlights = async (req, res) => {
  try {
    const { currentPage, searchString } = req.query;
    const highlights = await service.getAllHighlights(
      currentPage,
      searchString
    );

    res.status(200).send(highlights);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const highlight = await service.getHighlight(id);

    res.status(200).send(highlight);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const createHighlight = async (req, res) => {
  try {
    const data = req.body;
    await service.createHighlight(data);

    res.sendStatus(201);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const updateHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await service.updateHighlight(id, data);

    res.status(200).send(true);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const deleteHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteHighlight(id);

    res.status(200).send(true);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getLastestHighlights = async (req, res) => {
  try {
    const highlights = await service.getLastestHighlights();

    res.status(200).send(highlights);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = {
  getAllHighlights,
  getHighlight,
  createHighlight,
  updateHighlight,
  deleteHighlight,
  getLastestHighlights,
};
