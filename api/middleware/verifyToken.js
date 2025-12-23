const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Không có token truy cập" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ decoded:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Không tìm thấy user" });
    }

    // ép _id thành string để so sánh không bị lệch
    req.user = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
      specialty: user.specialty,
      experience: user.experience,
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: "Token không hợp lệ hoặc đã hết hạn" });
  }
};