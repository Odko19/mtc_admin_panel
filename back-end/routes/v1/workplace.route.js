const express = require("express");
const router = express.Router();
const workplaceController = require("../../modules/workplace");
const file = require("../../helpers/image-uploader");

router.get("/?", workplaceController.getAllWorkplace);
router.post("/", workplaceController.getCreateWorkplace);
router.post(
  "/cv",
  file.upload.array("file"),
  workplaceController.getWorkplaceCv
);
router.put("/", workplaceController.getUpdateWorkplace);
router.delete("/?", workplaceController.getDeleteWorkplace);

module.exports = router;
