const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  type: String,
  responseTime: Number,
  timestamp: Number,
});

module.exports = mongoose.model("Log", logSchema);
