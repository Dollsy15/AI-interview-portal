const mongoose = require("mongoose");

const codingSchema = new mongoose.Schema({
  userId: String,
  question: String,
  code: String,
  language: String,
  passed: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Coding", codingSchema);
