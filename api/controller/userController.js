const User = require("../models/user");
const staffRequest = require("../models/staffRequest")
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




// lấy ra đội ngũ nhân viên 
exports.getAllStaffs = async (req, res) => {
  try {
    // Lấy danh sách user role = "staff"
    const staffs = await User.find({ role: "staff" }).lean();

    // Lấy toàn bộ staffRequest để join
    const requests = await staffRequest.find().lean();

    // JOIN thủ công
    const result = staffs.map(staff => {
      const req = requests.find(r => r.email === staff.email);

      return {
        ...staff,
        specialty: req?.specialty || "Chưa cập nhật",
        experience: req?.experience || 0
      };
    });

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};