const express = require("express");
const router = express.Router();
const chatbotController = require("../controller/chatbotController");
const verifyToken = require("../middleware/verifyToken");
// CRUD cho ChatbotData
// Khách hàng có thể hỏi chatbot mà không cần đăng nhập
router.get("/", chatbotController.getAll);
router.get("/:id", chatbotController.getOne);

// Quản lý dữ liệu chatbot → chỉ admin (sau này thêm checkRole)
router.post("/", verifyToken, chatbotController.create);
router.put("/:id", verifyToken, chatbotController.update);
router.delete("/:id", verifyToken, chatbotController.remove);

module.exports = router;