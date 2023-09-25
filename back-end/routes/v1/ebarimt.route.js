const express = require("express");
const router = express.Router();
const ebarimtController = require("../../modules/ebarimt_id");

// router.get("/", ebarimtController.getTokenEbarimt);
// router.get("/reg", ebarimtController.getRegUserEbarimt);
// router.get("/cus", ebarimtController.getCusUserEbarimt);
// router.get("/subs", ebarimtController.getSubsEbarimt);
router.get("/", ebarimtController.getAllEbarimt);
router.get("/id", ebarimtController.getIdEbarimt);
router.put("/", ebarimtController.getUpdateEbarimt);
router.put("/edit", ebarimtController.getUpdateEditEbarimt);
router.post("/", ebarimtController.getAddEbarimt);

module.exports = router;
