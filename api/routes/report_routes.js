const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkRole");
// CRUD cho Report
router.post("/", verifyToken,checkRole("admin"), reportController.create);
router.get("/", verifyToken,checkRole("admin"), reportController.getAll);
router.get("/:id", verifyToken,checkRole("admin"), reportController.getOne);
router.put("/:id", verifyToken,checkRole("admin"), reportController.update);
router.delete("/:id", verifyToken,checkRole("admin"), reportController.remove);

module.exports = router;