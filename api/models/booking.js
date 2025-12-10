const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // Họ và tên
  phone:    { type: String, required: true }, // Số điện thoại
  email:    { type: String },                 // Email (không bắt buộc)
  date:     { type: Date, required: true },   // Ngày đặt lịch
  serviceId:{ type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }, // Dịch vụ
  staffId:  { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Thợ (có thể ngẫu nhiên)
  note:     { type: String },                 // Ghi chú thêm
  status:   { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" }, // Trạng thái
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");