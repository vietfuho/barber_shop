const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: "Không có token truy cập" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // dùng biến môi trường
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token không hợp lệ hoặc đã hết hạn" });
  }
};