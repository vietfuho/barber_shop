const bcrypt = require("bcrypt");
const User = require("../models/user");
const StaffRequest = require("../models/staffRequest")
// controllers/staffController.js (hoặc file tương ứng)


exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    // 1. Lấy request nhân viên
    const request = await StaffRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu" });
    }

    // 2. Chuẩn hóa username/email để tìm user
    const identifier = request.usernameOrEmail || request.email;
    if (!identifier) {
      return res.status(400).json({ message: "Yêu cầu thiếu thông tin username/email" });
    }

    // 3. Tìm user theo email hoặc username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy user để phê duyệt" });
    }

    // 4. GÁN TRỰC TIẾP (không hash phone nữa)
    if (request.phone) {
      user.phone = request.phone;   // ← Không hash, không hardcode
    }

    if (request.specialty) {
      user.specialty = request.specialty;
    }

    if (request.experience) {
      user.experience = request.experience;
    }

    // 5. Chuyển quyền
    user.role = "staff";

    await user.save();

    // 6. Xóa request sau khi phê duyệt
    await StaffRequest.findByIdAndDelete(requestId);

    return res.json({ message: "Phê duyệt thành công", staff: user });

  } catch (error) {
    console.error("approveRequest error:", error);
    return res.status(500).json({ error: error.message || "Lỗi máy chủ" });
  }
};



exports.rejectRequest = async (req, res) => {
  try {
    const updated = await StaffRequest.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Lỗi từ chối" });
  }
};

exports.GetAll = async (req, res) => {
  try {
    const requests = await StaffRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
