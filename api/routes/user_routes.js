const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkRole");

// Ai cũng có thể đăng ký
router.post("/", userController.create);

// Chỉ admin/staff mới xem danh sách
router.get("/", verifyToken, checkRole(["admin","staff"]), userController.getAll);

// Chỉ user đã đăng nhập mới xem chi tiết
router.get("/:id", verifyToken, userController.getOne);

// Chỉ user đã đăng nhập mới cập nhật
router.put("/:id", verifyToken, userController.update);

// Chỉ admin mới được xóa
router.delete("/:id", verifyToken, checkRole("admin"), userController.remove);



module.exports = router;