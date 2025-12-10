const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL; // dùng đúng tên biến
    if (!uri) throw new Error("MONGODB_URL chưa được định nghĩa trong .env");

    await mongoose.connect(uri);
    console.log("✅ Kết nối MongoDB thành công");
  } catch (err) {
    console.error("❌ Kết nối MongoDB thất bại:", err.message);
  }
};

module.exports = connectDB;