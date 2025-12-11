
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.approveRequest = async (req, res) => {
  try {
    const request = await StaffRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Không tìm thấy yêu cầu" });

    const hashed = await bcrypt.hash(request.password, 10);

    const staff = await User.create({
      username: request.fullName,
      password: hashed,
      specialty: request.specialty,
      experience: request.experience,
      role: "staff"
    });

    request.status = "approved";
    await request.save();

    res.json({ message: "Yêu cầu đã được phê duyệt", staff });
  } catch (err) {
    res.status(500).json({ error: "Lỗi phê duyệt", details: err.message });
  }
};