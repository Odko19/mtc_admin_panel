const express = require("express");
const router = express.Router();
const newsController = require("../../modules/news");
const file = require("../../helpers/image-uploader");

router.get("/all?", newsController.getAllNews);
router.get("/?", newsController.getNewsById);
router.get("/?", newsController.getNewsPage);
router.post("/", file.upload.array("cover_img"), newsController.getCreateNews);
router.put("/", file.upload.array("cover_img"), newsController.getUpdateNews);
router.delete("/?", newsController.getDeleteNews);

module.exports = router;
