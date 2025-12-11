const mongoose = require("mongoose");
const User = require("../models/user");
const bookingSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  fullName: { type: String, required: true }, // Họ và tên
  phone:    { type: String, required: true }, // Số điện thoại
  email:    { type: String },                 // Email (không bắt buộc)
  date:     { type: Date, required: true },   // Ngày đặt lịch
  note:     { type: String },                 // Ghi chú thêm cho họ biết 
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");