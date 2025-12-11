module.exports = function (roles = []) {
  // Nếu roles là string thì chuyển thành array
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Chưa đăng nhập" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }
    next();
  };
};