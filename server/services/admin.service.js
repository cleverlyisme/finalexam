const dayjs = require("dayjs");
const moment = require("moment");

const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
const Class = require("../models/class.model");

const getReports = async (_id) => {
  const numberOfStudents = await Student.countDocuments({ isDeleted: false });
  const numberOfTeachers = await Teacher.countDocuments({ isDeleted: false });
  const numberOfClasses = await Class.countDocuments({ isDeleted: false });

  const studentsOffWithPermission = await Student.countDocuments({
    dayoffs: {
      $elemMatch: {
        date: moment().format("YYYY-MM-DD"),
        withPermission: true,
      },
    },
  });
  const studentsOffWithoutPermission = await Student.countDocuments({
    dayoffs: {
      $elemMatch: {
        date: moment().format("YYYY-MM-DD"),
        withPermission: false,
      },
    },
  });

  return {
    numberOfStudents,
    numberOfTeachers,
    numberOfClasses,
    studentsOff: {
      withPermission: studentsOffWithPermission,
      withoutPermission: studentsOffWithoutPermission,
    },
  };
};

const getCharts = async (_id) => {
  const students = await Student.find({ isDeleted: false }).populate(
    "mainClass"
  );

  const grade10 = students.filter(
    (student) => student.mainClass.grade === 10
  ).length;
  const grade11 = students.filter(
    (student) => student.mainClass.grade === 11
  ).length;
  const grade12 = students.filter(
    (student) => student.mainClass.grade === 12
  ).length;

  return {
    pieChart: {
      grade10,
      grade11,
      grade12,
    },
  };
};

module.exports = {
  getReports,
  getCharts,
};
