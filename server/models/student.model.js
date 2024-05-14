const mongoose = require("mongoose");
const Class = require("./class.model");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    mainClass: { type: Schema.Types.ObjectId, ref: Class, required: true },
    dayoffs: [
      {
        date: { type: Date, required: true },
        withPermission: { type: Boolean, default: false },
      },
    ],
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
