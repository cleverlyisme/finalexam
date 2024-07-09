const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Class = require("./class.model");

const scheduleSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: Class,
    required: true,
  },
  schedule: {
    mon: {
      morning: [{ type: String, _id: false }],
      afternoon: [{ type: String, _id: false }],
    },
    tue: {
      morning: [{ type: String, _id: false }],
      afternoon: [{ type: String, _id: false }],
    },
    wed: {
      morning: [{ type: String, _id: false }],
      afternoon: [{ type: String, _id: false }],
    },
    thu: {
      morning: [{ type: String, _id: false }],
      afternoon: [{ type: String, _id: false }],
    },
    fri: {
      morning: [{ type: String, _id: false }],
      afternoon: [{ type: String, _id: false }],
    },
    sat: {
      morning: [{ type: String, _id: false }],
      afternoon: [{ type: String, _id: false }],
    },
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
