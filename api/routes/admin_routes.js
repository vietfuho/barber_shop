const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkRole");
const adminController = require("../controller/adminController");
const verifyToken = require("../middleware/verifyToken");
router.get("/approve",  verifyToken, checkRole("admin"), adminController.approveRequest);

module.exports = router;