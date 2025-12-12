const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialty:  { type: String  },
  experience: { type: Number },
  role:     { type: String, enum: ["admin", "staff", "member"], default: "member" },
  address:  { type: String },   // không required
  phone:    { type: String },   // không required
  avatar:   { type: String },   // không required
  birthday: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema, "users");

module.exports = User;