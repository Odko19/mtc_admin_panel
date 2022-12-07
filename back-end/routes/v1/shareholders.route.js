const express = require("express");
const router = express.Router();
const shareController = require("../../modules/shareholders");
const file = require("../../helpers/image-uploader");

router.get("/", shareController.getAllShare);
router.get("/?", shareController.getShareById);
router.post(
  "/",
  file.upload.array("cover_img"),
  shareController.getCreateShare
);
router.put("/", file.upload.array("cover_img"), shareController.getUpdateShare);
router.delete("/?", shareController.getDeleteShare);

module.exports = router;
