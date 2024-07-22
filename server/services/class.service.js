const Class = require("../models/class.model");

const getAllClasses = async () => {
  const classes = await Class.find({ isDeleted: false }).lean();

  return classes || [];
};

module.exports = { getAllClasses };
