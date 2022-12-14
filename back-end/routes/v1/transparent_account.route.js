const express = require("express");
const router = express.Router();
const accountController = require("../../modules/transparent_account");
const file = require("../../helpers/image-uploader");

router.get("/?", accountController.getAllAccount);
router.post(
  "/",
  file.upload.array("cover_img"),
  accountController.getCreateAccount
);
router.put(
  "/",
  file.upload.array("cover_img"),
  accountController.getUpdateAccount
);
router.delete("/?", accountController.getDeleteAccount);

module.exports = router;
