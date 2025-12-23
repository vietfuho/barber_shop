const express = require("express");
const router = express.Router();
const staffRequestController = require("../controller/request");
const checkRole = require("../middleware/checkrole");
const verifyToken = require("../middleware/verifyToken");

// Member gửi yêu cầu trở thành staff
router.post(
  "/request",
  verifyToken,
  checkRole("member"),
  staffRequestController.createRequest
);

module.exports = router;