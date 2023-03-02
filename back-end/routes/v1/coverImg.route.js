const express = require("express");
const router = express.Router();
const coverImgController = require("../../modules/coverImg");
const image = require("../../helpers/image-uploader");

router.get("/?", coverImgController.getAllCoverImg);
router.post(
  "/",
  image.upload.array("image"),
  coverImgController.getCreateCoverImg
);
router.put(
  "/",
  image.upload.array("image"),
  coverImgController.getUpdateCoverImg
);
router.delete("/?", coverImgController.getDeleteCoverImg);

module.exports = router;
