const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: "false",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);