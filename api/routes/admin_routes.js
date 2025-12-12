const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkrole");
const adminController = require("../controller/adminController");
const verifyToken = require("../middleware/verifyToken");

router.get("/approve",  verifyToken, checkRole("admin"), adminController.approveRequest);

// từ chối 
router.put("/reject/:id",verifyToken,checkRole("admin"), adminController.rejectRequest);

// Chỉ admin mới có thể phê duyệt
router.put("/approve/:id",verifyToken,checkRole("admin"), adminController.approveRequest);

router.get("/requests",verifyToken,checkRole("admin"),adminController.GetAll)
module.exports = router;