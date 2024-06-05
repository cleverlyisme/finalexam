const dayjs = require("dayjs");
const moment = require("moment");

const Schedule = require("../models/schedule.model");
const Teacher = require("../models/teacher.model");

const getScheduleByClass = async (_id) => {
  const schedule = await Schedule.findOne({
    class: _id,
  });

  if (!schedule) {
    throw new Error("Not found schedule of this class");
  }

  return schedule;
};

const getScheduleByTeacher = async (id) => {
  const teacher = await Teacher.findOne({
    _id: id,
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  const week = ["mon", "tue", "wed", "thu", "fri"];
  let teacherSchedule = {
    mon: new Array(5).fill(""),
    tue: new Array(5).fill(""),
    wed: new Array(5).fill(""),
    thu: new Array(5).fill(""),
    fri: new Array(5).fill(""),
  };
  const {_id, fullName, teacherOfClasses, subject} = teacher;

  for (const classRoom of teacherOfClasses) {
    const room = await Schedule.findOne({
      class: classRoom,
      isDeleted: false,
    }).populate("class");

    week.map((item) => {
      if (room.schedule[item].includes(subject)) {
        teacherSchedule[item] = room.schedule[item].map((sj) => {
          if (sj === subject) {
            return room.class.name;
          }
          return "";
        });
      }
    });
  }

  return {
    _id,
    fullName,
    schedule: teacherSchedule
  };
};

module.exports = {
  getScheduleByClass,
  getScheduleByTeacher,
};
