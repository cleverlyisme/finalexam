const service = require("../services/information.service");

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
  getStudentTranscriptLatestSemester,
  getStudentLatestFees,
};
