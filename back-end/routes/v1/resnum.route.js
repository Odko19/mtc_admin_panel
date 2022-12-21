const express = require("express");
const router = express.Router();
const resNumController = require("../../modules/resnum")

router.get("/?", resNumController.getAllResNum);

module.exports = router;