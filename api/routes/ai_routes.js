const express = require('express');
const router = express.Router();
const aiController = require('../controller/aiController');

// Local FAQ-based AI endpoint
router.post('/faq', aiController.searchFaq);

module.exports = router;
