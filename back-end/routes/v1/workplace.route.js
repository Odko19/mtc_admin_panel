const express = require("express");
const router = express.Router();
const workplaceController = require("../../modules/workplace");

router.get("/?", workplaceController.getAllWorkplace);
router.post("/", workplaceController.getCreateWorkplace);
router.put("/", workplaceController.getUpdateWorkplace);
router.delete("/?", workplaceController.getDeleteWorkplace);

module.exports = router;
