const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkrole");
const adminController = require("../controller/adminController");
const verifyToken = require("../middleware/verifyToken");

// Từ chối yêu cầu trở thành staff
router.put("/reject/:id", verifyToken, checkRole("admin"), adminController.rejectRequest);

// Phê duyệt yêu cầu trở thành staff
router.put("/approve/:id", verifyToken, checkRole("admin"), adminController.approveRequest);

// Lấy tất cả yêu cầu staff
router.get("/requests", verifyToken, checkRole("admin"), adminController.GetAll);

module.exports = router;