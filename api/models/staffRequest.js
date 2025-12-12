const mongoose = require("mongoose");

const staffRequestSchema = new mongoose.Schema({
  email:      { type: String, required: true },   // sửa lại
  phone:      { type: String, required: true },   // sửa lại
  specialty:  { type: String },
  experience: { type: Number, default: 0 },
  status:     { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model("StaffRequest", staffRequestSchema, "staff_requests");