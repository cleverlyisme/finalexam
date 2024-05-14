const mongoose = require("mongoose");

const { APP_EMAIL_EXPIRE } = require("../utils/environments");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "teacher", "parent"],
  },
  token: {
    type: String,
    required: true,
  },
  expireTime: {
    type: Number,
    default: Date.now() + Number(APP_EMAIL_EXPIRE),
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
