const express = require("express");
const router = express.Router();
const file = require("../../helpers/image-uploader");
const imageController = require("../../modules/images");

router.post(
  "/",
  file.upload.array("cover_img"),
  imageController.getCreateImage
);
router.post("/file", file.upload.array("file"), imageController.getCreateFile);

module.exports = router;
