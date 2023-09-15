const express = require("express");
const router = express.Router();
const ebarimtController = require("../../modules/ebarimt_id");

router.get("/", ebarimtController.getAllEbarimt);
router.get("/reg", ebarimtController.getAllEbarimtReg);

module.exports = router;
