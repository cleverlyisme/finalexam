const Parent = require("../models/parent.model");
const Student = require("../models/student.model");
const Semester = require("../models/semester.model");

const getStudentTranscriptLatestSemester = async (_id) => {
  const parent = await Parent.findOne({ _id })
    .populate("student")
    .select("student")
    .lean();

  if (!parent) {
    throw new Error("Học sinh không tồn tại");
  }

  const student = await Student.findOne({
    _id: parent.student._id,
    isDeleted: false,
  })
    .populate({
      path: "finalScore",
      populate: {
        path: "semester",
      },
    })
    .populate({
      path: "scores",
      populate: {
        path: "semester",
      },
    });

  if (!student) {
    throw new Error("Học sinh không tồn tại");
  }

  const lastSemester = student.finalScore
    .sort((a, b) =>
      b.semester.to - a.semester.to === 0
        ? b.semester.semester - a.semester.semester
        : b.semester.to - a.semester.to
    )
    .shift();
  const scores = student.scores.find(
    (score) =>
      score.semester._id.toString() === lastSemester.semester._id.toString()
  );
  return {
    name: student.fullName,
    scores: scores.detail,
    semester: lastSemester.semester,
  };
};

const getStudentLatestFees = async (_id) => {
  const parent = await Parent.findOne({ _id })
    .populate("student")
    .select("student")
    .lean();

  if (!parent) {
    throw new Error("Học sinh không tồn tại");
  }

  const student = await Student.findOne({
    _id: parent.student._id,
    isDeleted: false,
  }).populate({
    path: "fees",
    populate: {
      path: "fee",
    },
  });

  const feesPaid = student.fees
    .filter((item) => item.status === "paid")
    .sort((a, b) => b.fee.to - a.fee.to)
    .slice(0, 5);
  const feesNotPaid = student.fees
    .filter((item) => item.status === "not-paid")
    .sort((a, b) => b.fee.to - a.fee.to)
    .slice(0, 5);

  return {
    paid: feesPaid || [],
    notPaid: feesNotPaid || [],
  };
};

module.exports = { getStudentTranscriptLatestSemester, getStudentLatestFees };
