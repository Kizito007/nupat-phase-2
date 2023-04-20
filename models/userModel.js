const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
}, {
  timestamps: true,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
