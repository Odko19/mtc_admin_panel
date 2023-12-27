const express = require("express");
const router = express.Router();
const newsController = require("../../modules/news");
const file = require("../../helpers/image-uploader");

router.get("/?", newsController.getAllNews);
router.get("/search?", newsController.getSearchNews);
router.post("/", file.upload.array("cover_img"), newsController.getCreateNews);
router.put("/", file.upload.array("cover_img"), newsController.getUpdateNews);
router.delete("/?", newsController.getDeleteNews);

module.exports = router;
