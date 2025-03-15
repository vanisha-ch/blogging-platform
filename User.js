const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const user = mongoose.model("user", userschema);
module.exports = user;
