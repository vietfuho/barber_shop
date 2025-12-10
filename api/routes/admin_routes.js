const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkRole");
const adminController = require("../controller/adminController");
const verifyToken = require("../middleware/verifyToken");
router.get("/",  verifyToken, checkRole("admin"), adminController.Home);

module.exports = router;