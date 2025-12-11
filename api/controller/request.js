const StaffRequest = require("../models/staffRequest");

exports.createRequest = async (req, res) => {
  try {
    const { fullName, password, specialty, experience } = req.body;

    if (!fullName || !password || !specialty) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    const request = await StaffRequest.createRequest({
      fullName,
      password,
      specialty,
      experience
    });

    res.status(201).json({ message: "Yêu cầu đăng ký đã được gửi", request });
  } catch (err) {
    res.status(500).json({ error: "Lỗi gửi yêu cầu", details: err.message });
  }
};