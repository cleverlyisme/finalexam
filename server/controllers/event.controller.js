const service = require("../services/event.service");

const getAllEvents = async (req, res) => {
  try {
    const { currentPage, searchString } = req.query;
    const events = await service.getAllEvents(currentPage, searchString);

    res.status(200).send(events);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await service.getEvent(id);

    res.status(200).send(event);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const createEvent = async (req, res) => {
  try {
    const data = req.body;
    await service.createEvent(data);

    res.sendStatus(201);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await service.updateEvent(id, data);

    res.status(200).send(true);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteEvent(id);

    res.status(200).send(true);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getLastestEvents = async (req, res) => {
  try {
    const events = await service.getLastestEvents();

    res.status(200).send(events);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getLastestEvents,
};
