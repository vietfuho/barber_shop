const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên dịch vụ

  // Kiểu tóc: mảng chuỗi tự nhập
  styleOptions: { type: String },       // Ví dụ: ["Undercut", "Layer", "Fade"]

  // Màu nhuộm: mảng object
  colorOptions: [
    {
      label: String,   // Tên màu: "Xám khói"
      swatch: String   // Mã màu hoặc link ảnh
    }
  ],

  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  imageUrl: { type: String },
  imageFile: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Service", serviceSchema);