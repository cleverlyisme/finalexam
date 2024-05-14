const service = require("../services/admin.service");

const getReports = async (req, res) => {
  try {
    const reports = await service.getReports();

    res.status(200).send(reports);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getCharts = async (req, res) => {
  try {
    const charts = await service.getCharts();

    res.status(200).send(charts);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = {
  getReports,
  getCharts,
};
