const service = require("../services/schedule.service");

const getScheduleByClass = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await service.getScheduleByClass(id);

    res.status(200).send(schedule);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getScheduleByTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await service.getScheduleByTeacher(id);

    res.status(200).send(schedule);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = {
  getScheduleByClass,
  getScheduleByTeacher
};
