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
    mon: [{ type: String, _id: false }],
    tue: [{ type: String, _id: false }],
    wed: [{ type: String, _id: false }],
    thu: [{ type: String, _id: false }],
    fri: [{ type: String, _id: false }],
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
