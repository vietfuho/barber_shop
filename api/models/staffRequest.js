const mongoose = require("mongoose");

const staffRequestSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email:      { type: String, required: true },
  username:   { type: String },
  phone:      { type: String },
  address:    { type: String },
  role:       { type: String },
  avatar:     { type: String },
  specialty:  { type: String ,required: true},
  experience: { type: Number, default: 0 },
  description:{ type: String },
  level:      { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" }, // trình độ
  workerRole: { type: String, enum: ["chinh", "phu", "freelancer"], default: "chinh" }, // vai trò thợ
  status:     { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model("StaffRequest", staffRequestSchema, "staff_requests");