const service = require("../services/information.service");

const { subjects } = require("../utils/constants");

const getAllSubjects = async (req, res) => {
  try {
    res.status(200).send(subjects.sort());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getStudentTranscriptLatestSemester = async (req, res) => {
  try {
    const { userId } = req;
    const data = await service.getStudentTranscriptLatestSemester(userId);

    res.status(200).send(data);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getStudentLatestFees = async (req, res) => {
  try {
    const { userId } = req;
    const data = await service.getStudentLatestFees(userId);

    res.status(200).send(data);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = {
  getAllSubjects,
  getStudentTranscriptLatestSemester,
  getStudentLatestFees,
};
