const mongoose = require("mongoose");
const Student = require("./student.model");

const Schema = mongoose.Schema;

const parentSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please add your email"],
      match: [/.+\@.+\..+/, "Invalid email address"],
      unique: true,
      trim: true,
    },
    phoneNumber: { type: String, required: true },
    password: {
      type: String,
      required: [true, "Please add your password"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: Student,
      required: true,
    },
    father: {
      fullName: {
        type: String,
      },
      yearOfBirth: {
        type: Number,
      },
      note: {
        type: String,
      },
    },
    mother: {
      fullName: {
        type: String,
      },
      yearOfBirth: {
        type: Number,
      },
      note: {
        type: String,
      },
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

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
