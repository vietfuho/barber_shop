const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkrole");

// Tạo lịch hẹn → member
router.post("/", verifyToken, checkRole("member"), bookingController.create);

// Xem tất cả lịch hẹn → staff/admin xem tất cả, member chỉ xem của mình
router.get("/", verifyToken, checkRole(["member", "staff", "admin"]), bookingController.getAll);


// Xem chi tiết lịch hẹn → member (chính chủ) hoặc staff/admin
router.get("/:id", verifyToken, checkRole(["member", "staff", "admin"]), bookingController.getOne);

// Cập nhật lịch hẹn → member (chính chủ)
router.put("/:id", verifyToken, checkRole("member"), bookingController.update);

// Hủy lịch hẹn → member (chính chủ) hoặc admin
router.delete("/:id", verifyToken, checkRole(["member","staff","admin"]), bookingController.remove);

module.exports = router;