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

  const week = ["mon", "tue", "wed", "thu", "fri", "sat"];
  let teacherSchedule = {
    mon: {
      morning: new Array(5).fill(""),
      afternoon: new Array(4).fill(""),
    },
    tue: {
      morning: new Array(5).fill(""),
      afternoon: new Array(4).fill(""),
    },
    wed: {
      morning: new Array(5).fill(""),
      afternoon: new Array(4).fill(""),
    },
    thu: {
      morning: new Array(5).fill(""),
      afternoon: new Array(4).fill(""),
    },
    fri: {
      morning: new Array(5).fill(""),
      afternoon: new Array(4).fill(""),
    },
    sat: {
      morning: new Array(5).fill(""),
      afternoon: new Array(4).fill(""),
    },
  };
  const {_id, fullName, teacherOfClasses, subject} = teacher;

  for (const classRoom of teacherOfClasses) {
    const room = await Schedule.findOne({
      class: classRoom,
      isDeleted: false,
    }).populate("class");

    week.map((item) => {
      if (room.schedule[item].morning.includes(subject)) {
        teacherSchedule[item].morning = room.schedule[item].morning.map((sj) => {
          if (sj === subject) {
            return room.class.name;
          }
          return "";
        });
      }

      if (room.schedule[item].afternoon.includes(subject)) {
        teacherSchedule[item].afternoon = room.schedule[item].afternoon.map((sj) => {
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
