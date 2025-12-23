const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

  fullName:  { type: String },
  phone:     { type: String, required: true },
  email:     { type: String },
  date:      { type: Date, required: true },
  note:      { type: String },

  status: {
    type: String,
    enum: ["pending", "done", "cancelled", "no_show"],
    default: "pending", 
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");
