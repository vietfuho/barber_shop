const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkrole");
const adminController = require("../controller/adminController");
const verifyToken = require("../middleware/verifyToken");
const WorkSchedule = require("../controller/WorkSchedule")

// Từ chối yêu cầu trở thành staff
router.put("/reject/:id", verifyToken, checkRole("admin"), adminController.rejectRequest);

// Phê duyệt yêu cầu trở thành staff
router.put("/approve/:id", verifyToken, checkRole("admin"), adminController.approveRequest);

// Lấy tất cả yêu cầu staff
router.get("/requests", verifyToken, checkRole("admin"), adminController.GetAll);


// Admin tạo lịch cho staff
router.post("/schedule", verifyToken, checkRole("admin"), WorkSchedule.createWorkSchedule);

// Admin xem tất cả lịch
router.get("/schedules", verifyToken, checkRole("admin"), WorkSchedule.getAllSchedules);

// Staff xem lịch của mình
router.get("/my-schedule", verifyToken, checkRole("staff"), WorkSchedule.getMySchedule);




module.exports = router;