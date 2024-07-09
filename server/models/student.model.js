const mongoose = require("mongoose");

const Semester = require("./semester.model");
const Class = require("./class.model");
const Fee = require("./fee.model");

const Schema = mongoose.Schema;

const validScore = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    dayOffs: [
      {
        date: { type: Date, required: true },
        withPermission: { type: Number, default: 2 },
      },
    ],
    scores: [
      {
        semester: {
          type: Schema.Types.ObjectId,
          ref: Semester,
          required: true,
        },
        detail: {
          math: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          literature: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          english: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          physics: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          chemistry: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          biology: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          geography: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          history: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          law: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          music: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          art: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
          sport: {
            x1: [{ type: Number, _id: false, enum: validScore }],
            x2: [{ type: Number, _id: false, enum: validScore }],
            x3: [{ type: Number, _id: false, enum: validScore }],
            medium: { type: Number, _id: false },
          },
        },
      },
    ],
    finalScore: [
      {
        semester: {
          type: Schema.Types.ObjectId,
          ref: Semester,
          required: true,
        },
        score: { type: Number },
      },
    ],
    conducts: [
      {
        semester: {
          type: Schema.Types.ObjectId,
          ref: Semester,
          required: true,
        },
        conduct: {
          type: String,
          enum: ["Tốt", "Khá", "Trung bình", "Yếu"],
        },
      },
    ],
    subjectTotalScore: [
      {
        time: {
          type: String,
          required: true,
        },
        detail: {
          math: { type: Number },
          literature: { type: Number },
          english: { type: Number },
          physics: { type: Number },
          chemistry: { type: Number },
          biology: { type: Number },
          geography: { type: Number },
          history: { type: Number },
          law: { type: Number },
          music: { type: Number },
          art: { type: Number },
          sport: { type: Number },
        },
      },
    ],
    totalScore: [
      {
        time: {
          type: String,
          required: true,
        },
        score: { type: Number },
      },
    ],
    totalConducts: [
      {
        time: {
          type: String,
          required: true,
        },
        conduct: {
          type: String,
          enum: ["Tốt", "Khá", "Trung bình", "Yếu"],
        },
      },
    ],
    totalResult: [
      {
        time: {
          type: String,
          required: true,
        },
        rank: {
          type: String,
          enum: ["Giỏi", "Tiên tiến", "Trung bình", "Yếu"],
        },
      },
    ],
    fees: [
      {
        fee: { type: Schema.Types.ObjectId, ref: Fee, required: true },
        status: {
          type: String,
          enum: ["paid", "not-paid", "canceled"],
          default: "not-paid",
        },
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
