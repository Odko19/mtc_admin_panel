const express = require("express");
const router = express.Router();
const orderController = require("../../modules/order");

router.get("/?", orderController.getAllOrder);
router.put("/", orderController.getUpdateOrder);

module.exports = router;
