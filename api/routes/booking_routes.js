const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkRole");
// CRUD cho Booking
// Tạo lịch hẹn → cần đăng nhập
router.post("/",verifyToken, checkRole("member"), bookingController.create);  //tạo lịch hẹn nè 

// Xem tất cả lịch hẹn → chỉ admin/staff (sau này thêm checkRole)
router.get("/",verifyToken, checkRole(["staff", "admin"]), bookingController.getAll);

// Xem chi tiết lịch hẹn → cần đăng nhập (chính chủ hoặc staff)
router.get("/:id",verifyToken, checkRole("member"), bookingController.getOne);

// Cập nhật lịch hẹn → cần đăng nhập
router.put("/:id",verifyToken, checkRole("member"), bookingController.update);

// Hủy lịch hẹn → cần đăng nhập
router.delete("/:id",verifyToken, checkRole("member"), bookingController.remove);

module.exports = router;