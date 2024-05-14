const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  time: {
    type: String,
  },
  content: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
