const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true }, 

  // Kiểu tóc: mảng chuỗi
  styleOptions: [{ type: String,required: true}],       

  // Màu nhuộm: mảng object
  colorOptions: [
    {
      label: String,   // Tên màu
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

module.exports = mongoose.model("Service", serviceSchema, "services");