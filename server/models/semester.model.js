const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  lastResult: {
    // time: {
    //   type: String,
    // },
    good: {
      type: Number,
    },
    medium: {
      type: Number,
    },
    bad: {
      type: Number,
    },
    veryBad: {
      type: Number,
    },
    _id: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Semester = mongoose.model("semesters", semesterSchema);

module.exports = Semester;
