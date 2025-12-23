    const express = require("express");
    const router = express.Router();
    const userController = require("../controller/userController");
    const verifyToken = require("../middleware/verifyToken");
    const checkRole = require("../middleware/checkrole");

    // Đăng ký user mới
    router.post("/", userController.create);

    // Lấy danh sách user → chỉ admin/staff
    router.get("/", verifyToken, checkRole(["admin", "staff"]), userController.getAll);

    // Lấy danh sách staff
    router.get("/team", verifyToken, userController.getAllStaffs);

    // Lấy profile của user hiện tại
    router.get("/profile", verifyToken, userController.getProfile);

    // Lấy chi tiết user theo id
    router.get("/:id", verifyToken, userController.getOne);

    // Cập nhật user
    router.put("/:id", verifyToken, userController.update);

    // Xóa user → chỉ admin
    router.delete("/:id", verifyToken, checkRole("admin"), userController.remove);

   

    module.exports = router;