const express = require("express");
const router = express.Router();
const staffRequestControl = require("../controller/request")


// Ai cũng có thể đăng ký
router.post("/request", staffRequestControl.createRequest);





module.exports = router;