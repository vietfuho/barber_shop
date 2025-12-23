const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:   { type: String, required: true, unique: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true }, // sẽ hash bằng bcrypt
  specialty:  { type: String },
  experience: { type: Number },
  role:       { type: String, enum: ["admin", "staff", "member"], default: "member" },
  address:    { type: String },
  phone:      { type: String },
  avatar:     { type: String },
  birthday:   { type: Date },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema, "users");