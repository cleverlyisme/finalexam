const mongoose = require("mongoose");
const Class = require("./class.model");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    yearOfBirth: {
      type: Number,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    mainTeacherOfClass: {
      type: Schema.Types.ObjectId,
      ref: Class,
      required: true,
    },
    teacherOfClasses: [
      { type: Schema.Types.ObjectId, ref: Class, required: true },
    ],
    subject: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
