const dayjs = require("dayjs");

const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

const formatStudents = (students, date) => {
  const formattedStudents = students.map((student) => {
    const dayoffs = student.dayoffs;
    const dateFound = dayoffs.find((day) => {
      return day.date.toISOString() === new Date(date).toISOString();
    });

    return {
      ...student,
      id: student._id,
      mainClass: student.mainClass.name,
      gender: student.gender ? "Nam" : "Nữ",
      dateOfBirth: dayjs(student.dateOfBirth).format("DD-MM-YYYY"),
      status: !dateFound
        ? "Có mặt"
        : dateFound?.withPermission
        ? "Nghỉ học có phép"
        : "Nghỉ học không phép",
    };
  });

  return formattedStudents || [];
};

const getStudentsOfMainClass = async (_id) => {
  const teacher = await Teacher.findOne({ _id }).lean();

  if (!teacher) throw new Error("Teacher not found");

  const students = await Student.find({
    mainClass: teacher.mainTeacherOfClass,
  })
    .populate("mainClass")
    .lean();

  const formattedStudents = students.map((student) => ({
    ...student,
    mainClass: student.mainClass.name,
    gender: student.gender ? "Nam" : "Nữ",
    dateOfBirth: dayjs(student.dateOfBirth).format("DD-MM-YYYY"),
  }));

  return formattedStudents || [];
};

const getStudentsOfMainClassByDate = async (_id, date) => {
  const teacher = await Teacher.findOne({ _id }).lean();

  if (!teacher) throw new Error("Teacher not found");

  const students = await Student.find({
    mainClass: teacher.mainTeacherOfClass,
  })
    .populate("mainClass")
    .lean();

  return formatStudents(students, date);
};

const markBreak = async (_id, students, date, withPermission) => {
  const teacher = await Teacher.findOne({ _id }).lean();

  if (!teacher) throw new Error("Teacher not found");

  for (const studentId of students) {
    const student = await Student.findOne({ _id: studentId });

    student.dayoffs = student.dayoffs.filter(
      (day) =>
        day.date.toISOString().slice(0, 10) !==
        new Date(date).toISOString().slice(0, 10)
    );

    if (Number(withPermission) !== 2)
      student.dayoffs = [
        ...student.dayoffs,
        {
          date: new Date(date).toISOString(),
          withPermission,
        },
      ];

    await student.save();
  }

  const studentsData = await Student.find({
    mainClass: teacher.mainTeacherOfClass,
  })
    .populate("mainClass")
    .lean();

  return formatStudents(studentsData, date);
};

module.exports = {
  getStudentsOfMainClass,
  getStudentsOfMainClassByDate,
  markBreak,
};
