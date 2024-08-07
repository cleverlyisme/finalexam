const mongoose = require("mongoose");

const Semester = require("./semester.model");

const Schema = mongoose.Schema;

const feeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: Semester,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["tuition", "others"],
  },
  from: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  to: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;
