const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const memberController = require("../controller/ChatbotMember");
const chatbotcontroller = require("../controller/chatbotController.js");

router.post("/sendtoadmin", verifyToken, memberController.sendMessageToAdmin);
router.get("/getformember", verifyToken, memberController.getMessagesForMember);

router.post("/sendtomember", verifyToken, chatbotcontroller.sendMessageToMember);
router.get("/getforadmin", verifyToken, chatbotcontroller.getMessagesForAdmin);

module.exports = router;