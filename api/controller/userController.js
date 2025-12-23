const bcrypt = require("bcrypt");
const User = require("../models/user");

// Tạo user mới
exports.create = async (req, res) => {
  try {
    const { username, email, password, role, ...rest } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role && ["admin", "staff", "member"].includes(role) ? role : "member",
      ...rest,
    });

    const { password: _, ...userData } = user.toObject();
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ error: "Lỗi tạo user" });
  }
};

// Lấy tất cả user
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách user" });
  }
};

// Lấy 1 user theo id
exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "Không tìm thấy user" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy user" });
  }
};

// Cập nhật user
exports.update = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "Không tìm thấy user" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật user" });
  }
};

// Xóa user
exports.remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Không tìm thấy user" });
    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa user" });
  }
};

// Lấy profile từ token
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy đội ngũ nhân viên
exports.getAllStaffs = async (req, res) => {
  try {
    const staffs = await User.find({ role: "staff" })
      .select("-password") // bỏ mật khẩu
      .lean();

    res.json(staffs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



