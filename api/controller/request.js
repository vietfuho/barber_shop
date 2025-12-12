const StaffRequest = require("../models/staffRequest");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Người dùng gửi yêu cầu

exports.createRequest = async (req, res) => {
  try {
    const { usernameOrEmail, phone, specialty, experience } = req.body;

    // ⛔ Thêm kiểm tra: 1 user chỉ được gửi 1 yêu cầu
    const existingRequest = await StaffRequest.findOne({ email: usernameOrEmail });
    if (existingRequest) {
      return res.status(400).json({ 
        message: "Bạn đã gửi yêu cầu trước đó. Không thể gửi thêm." 
      });
    }

    // Kiểm tra body có khớp với token không
    if (!req.user || req.body.email !== req.user.email) {
      return res.status(400).json({ message: "Email không khớp với tài khoản đang đăng nhập" });
    }

    const newRequest = new StaffRequest({
      email: usernameOrEmail, // giữ nguyên như bạn đang dùng
      phone,
      specialty,
      experience
    });

    await newRequest.save();

    res.status(201).json({
      message: "Yêu cầu đăng ký nhân viên đã được gửi",
      request: newRequest
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
