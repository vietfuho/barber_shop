const User = require("../models/user");

// Tạo user mới
exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi tạo user" });
  }
};

// Lấy tất cả user
exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách user" });
  }
};

// Lấy 1 user theo id
exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy user" });
  }
};

// Cập nhật user
exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật user" });
  }
};

// Xóa user
exports.remove = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa user" });
  }
};
