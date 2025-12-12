const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Không có token truy cập" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ decoded:", decoded);

    req.user = {
      id: decoded.id,   // phải là _id của user trong DB
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: "Token không hợp lệ hoặc đã hết hạn" });
  }
};