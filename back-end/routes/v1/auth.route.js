const express = require("express");
const router = express.Router();
const authController = require("../../modules/authencation");

router.post("/", authController.getLoginUser);

module.exports = router;
