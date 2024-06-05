const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
