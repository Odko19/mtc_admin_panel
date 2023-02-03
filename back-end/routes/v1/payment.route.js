const express = require("express");
const router = express.Router();
const paymentController = require("../../modules/payment");

router.get("/?", paymentController.getAllPayment);

module.exports = router;
