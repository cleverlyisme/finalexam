const service = require("../services/teacher.service");

const getStudentsOfMainClass = async (req, res) => {
  try {
    const { userId } = req;

    const students = await service.getStudentsOfMainClass(userId);

    res.status(200).send({ students });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getStudentsOfMainClassByDate = async (req, res) => {
  try {
    const { userId } = req;
    const { date } = req.query;

    const students = await service.getStudentsOfMainClassByDate(userId, date);

    res.status(200).send({ students });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const markBreak = async (req, res) => {
  try {
    const { userId } = req;
    const { students, date, withPermission } = req.body;

    const data = await service.markBreak(
      userId,
      students,
      date,
      withPermission
    );

    res.status(200).send({ students: data });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  getStudentsOfMainClass,
  getStudentsOfMainClassByDate,
  markBreak,
};
