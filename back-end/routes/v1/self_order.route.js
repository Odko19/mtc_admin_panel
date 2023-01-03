const express = require("express");
const router = express.Router();
const orderController = require("../../modules/order");

router.get("/?", orderController.getAllOrder);

module.exports = router;
