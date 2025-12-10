const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  type: { type: String, enum: ["revenue", "customers", "bookings"], required: true },
  data: { type: Object, required: true }, // lưu thống kê dạng JSON
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);