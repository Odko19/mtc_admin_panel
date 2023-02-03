const express = require("express");
const router = express.Router();
const feedbackController = require("../../modules/feedback");

router.get("/", feedbackController.getAllFeedback);

module.exports = router;
