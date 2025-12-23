    const express = require("express");
    const router = express.Router();
    const authController = require("../controller/authController");
    const verifyToken = require("../middleware/verifyToken")
    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.put("/change-password", verifyToken, authController.changePassword);
    module.exports = router;