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
    good: {
      type: Number,
      default: 0,
    },
    medium: {
      type: Number,
      default: 0,
    },
    bad: {
      type: Number,
      default: 0,
    },
    veryBad: {
      type: Number,
      default: 0,
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
