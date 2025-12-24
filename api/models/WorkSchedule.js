const mongoose = require("mongoose");

const workScheduleSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // nhân viên
  date: { type: Date, required: true }, // ngày làm việc
  shift: { type: String, enum: ["morning", "afternoon", "evening"], required: true }, // ca làm
  note: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin tạo
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WorkSchedule", workScheduleSchema, "work_schedules");