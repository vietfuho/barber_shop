const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");
// CRUD cho User

// Ai cũng có thể đăng ký (tạo user)
router.post("/", userController.create);  //tạo user

// Chỉ user đã đăng nhập mới xem danh sách
router.get("/",verifyToken, userController.getAll);         // Lấy tất cả user

// Chỉ user đã đăng nhập mới xem chi tiết
router.get("/:id",verifyToken, userController.getOne);      // Lấy 1 user theo id

// Chỉ user đã đăng nhập mới cập nhật
router.put("/:id",verifyToken, userController.update);      // Cập nhật user

// Chỉ admin mới được xóa (ví dụ thêm check role sau này)
router.delete("/:id",verifyToken, userController.remove);   // Xóa user

module.exports = router;