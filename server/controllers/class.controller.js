const service = require("../services/class.service");

const getAllClasses = async (req, res) => {
  try {
    const classes = await service.getAllClasses();

    res.status(200).send(classes);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = { getAllClasses };
