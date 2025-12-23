const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");
const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkrole");
const upload = require("../middleware/uploads");

// Public routes
router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getOne);

// Admin routes
router.post("/add", verifyToken, checkRole("admin"), upload.single("image"), serviceController.create);
router.put("/:id", verifyToken, checkRole("admin"), upload.single("image"), serviceController.update);
router.delete("/:id", verifyToken, checkRole("admin"), serviceController.remove);

module.exports = router;