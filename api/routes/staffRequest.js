const express = require("express");
const router = express.Router();
const staffRequestControl = require("../controller/request");
const checkrole = require("../middleware/checkrole");
const verify = require("../middleware/verifyToken")

// Ai cũng có thể đăng ký

router.post("/request", verify, checkrole("member"), staffRequestControl.createRequest);




module.exports = router;