const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");
const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkRole"); // nhớ đúng tên file
const upload = require("../middleware/uploads");
const path = require("path");
const multer = require("multer");
//Public routes (khách hàng)

// Khách hàng có thể xem danh sách dịch vụ mà không cần đăng nhập
router.get("/", serviceController.getAll);

// Xem chi tiết một dịch vụ theo ID
router.get("/:id", serviceController.getOne);

//  Admin routes (cần token + role admin)

// Thêm dịch vụ mới
router.post("/add", verifyToken, checkRole("admin"),upload.single("image"), serviceController.create);

// Cập nhật dịch vụ theo ID
router.put("/:id", verifyToken, checkRole("admin"), upload.single("image"), serviceController.update);

// Xóa dịch vụ theo ID
router.delete("/:id",verifyToken,checkRole("admin"),serviceController.remove);

module.exports = router;
