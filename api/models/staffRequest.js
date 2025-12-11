const mongoose = require("mongoose");

const staffRequestSchema = new mongoose.Schema({
  fullName:   { type: String, required: true },
  password:   { type: String, required: true }, // sẽ hash khi phê duyệt
  specialty:  { type: String, required: true },
  experience: { type: Number, default: 0 },
  status:     { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model("StaffRequest", staffRequestSchema, "staff_requests");