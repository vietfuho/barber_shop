const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  intent: { type: String, required: true }, // ví dụ: "đặt lịch", "giá dịch vụ"
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: [String], // từ khóa liên quan
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ChatbotData", chatbotSchema);